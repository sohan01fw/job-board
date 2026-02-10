"use server";

import { prisma } from "@/lib/Prisma";
import { redis } from "@/lib/redis"; // Import redis client
import { withTryCatch } from "@/lib/tryCatch";
import { Post, Prisma, User } from "@prisma/client";
import { PostUser, UserCmts } from "../types";
import { pusherServer } from "@/lib/pusher";
import { withRedisCache } from "@/lib/redis";

// ---------------------
// CREATE POST
// ---------------------
export async function createPost({
  authorId,
  content,
  imageUrl,
  jobId,
}: {
  authorId: string;
  content: string;
  imageUrl?: string[];
  jobId?: string | null;
}): Promise<Post> {
  return withTryCatch(async () => {
    return prisma.post.create({
      data: {
        authorId,
        content,
        imageUrl,
        jobsId: jobId ?? null,
      },
    });
  }, "Error while creating post");
}

// ---------------------
// GET FEED (latest posts)
// ---------------------

export async function getFeed({
  limit = 10,
  cursor,
}: {
  limit?: number;
  cursor?: string | null;
}) {
  return withTryCatch(async () => {
    const cacheKey = `feed:${limit}:${cursor || "first"}`;
    return withRedisCache(
      cacheKey,
      async () => {
        const posts = await prisma.post.findMany({
          take: limit + 1, // get one extra to check if there’s more
          ...(cursor ? { cursor: { id: cursor } } : {}),
          orderBy: { createdAt: "desc" },
          include: {
            author: true,
            comments: true,
            postlikes: true,
            jobs: {
              include: {
                _count: {
                  select: { jobApplications: true },
                },
              },
            },
          },
        });

        // Determine if there’s another page
        let nextCursor: string | null = null;
        if (posts.length > limit) {
          const nextItem = posts.pop(); // remove extra item
          nextCursor = nextItem!.id;
        }

        return {
          posts,
          nextCursor,
        };
      },
      60, // Cache feed for 1 minute
    );
  }, "Error while fetching feed");
}

// ---------------------
// GET POST BY ID
// ---------------------
export async function getMyPosts({
  userId,
  limit = 20,
  skip = 0,
}: {
  userId: string;
  limit?: number;
  skip?: number;
}): Promise<PostUser[]> {
  return withTryCatch(async () => {
    return prisma.post.findMany({
      where: { authorId: userId },
      take: limit,
      skip,
      orderBy: { createdAt: "desc" },
      include: {
        author: true,
        comments: true,
        postlikes: true,
        jobs: true,
      },
    });
  }, "Error while fetching my posts");
}

export async function getUserPostsWithJobs({ userId }: { userId: string }) {
  return withTryCatch(async () => {
    const posts = await prisma.post.findMany({
      where: {
        authorId: userId,
        jobsId: {
          not: null, // ✅ only posts that have a job linked
        },
      },
      select: {
        id: true,
        content: true,
        imageUrl: true,
        createdAt: true,
        jobsId: true, // ✅ include only job ID
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return { success: true, data: posts };
  }, "Error while fetching user's posts with jobs");
}

export async function deleteMyPost(postId: string) {
  return withTryCatch(async () => {
    await prisma.post.delete({
      where: { id: postId },
    });
    return { success: true };
  }, "Error while deleting post");
}
// ---------------------
// LIKE POST
// ---------------------

export const likePostQuery = async ({
  postId,
  userId,
  isLiked,
}: {
  postId: string;
  userId: string;
  isLiked: boolean;
}) =>
  withTryCatch(async () => {
    if (isLiked) {
      await prisma.postLike.deleteMany({ where: { postId, userId } });
    } else {
      await prisma.postLike.create({ data: { postId, userId } });
    }

    const likes = await prisma.postLike.count({ where: { postId } });

    return { likes };
  }, "Error while liking post");

// ---------------------
// CREATE COMMENT
// ---------------------
export const createCommentQuery = async ({
  postId,
  authorId,
  content,
}: {
  postId: string;
  authorId: string;
  content: string;
}) =>
  withTryCatch(async () => {
    return prisma.comment.create({
      data: { postId, authorId, content },
    });
  }, "Error while creating comment");

// ---------------------
// GET COMMENTS BY POST
// ---------------------
export const getCommentsByPostQuery = async (
  postId: string,
): Promise<UserCmts[]> =>
  withTryCatch(async () => {
    return prisma.comment.findMany({
      where: { postId },
      include: { author: true },
      orderBy: { createdAt: "asc" }, // oldest first
    });
  }, "Error while fetching comments");

export const getAllUsersExceptQuery = async (
  currentUserId: string,
): Promise<User[]> =>
  withTryCatch(async () => {
    return prisma.user.findMany({
      where: {
        NOT: [
          { id: currentUserId }, // exclude self

          {
            followers: {
              some: {
                followerId: currentUserId, // exclude users already followed by me
                deletedAt: null,
              },
            },
          },
        ],
      },
      orderBy: { createdAt: "desc" },
    });
  }, "Error while fetching users");

// ---------------------
// GET USER ACTIVITIES
//

export async function getFriendsAndFollowers(userId: string) {
  return withTryCatch(async () => {
    const cacheKey = `friendsAndFollowers:${userId}`;
    return withRedisCache(
      cacheKey,
      async () => {
        // Fetch all active follows where the user is either the follower or the following
        const allFollows = await prisma.follow.findMany({
          where: {
            OR: [{ followerId: userId }, { followingId: userId }],
            deletedAt: null,
          },
          include: {
            follower: true,
            following: true,
          },
        });

        // Segregate follows into following (users I follow) and followers (users who follow me)
        const following = allFollows.filter((f) => f.followerId === userId);
        const followers = allFollows.filter((f) => f.followingId === userId);

        const followerIds = new Set(followers.map((f) => f.followerId));
        const followingIds = new Set(following.map((f) => f.followingId));

        // Mutual friends: I follow them AND they follow me
        const mutualFriendUsers = following
          .filter((f) => followerIds.has(f.followingId))
          .map((f) => f.following);

        // Fetch all chats for the user to map friends to chatIds
        const userChats = await prisma.chatParticipant.findMany({
          where: { userId },
          select: {
            chatId: true,
            chat: {
              select: {
                participants: {
                  where: { userId: { not: userId } },
                  select: { userId: true },
                },
              },
            },
          },
        });

        const friendToChatId = new Map<string, string>();
        userChats.forEach((cp) => {
          const otherParticipant = cp.chat.participants[0];
          if (otherParticipant) {
            friendToChatId.set(otherParticipant.userId, cp.chatId);
          }
        });

        const friends = mutualFriendUsers.map((f) => ({
          ...f,
          chatId: friendToChatId.get(f.id),
        }));

        // Following only: I follow them but they don't follow me
        const followingOnly = following
          .filter((f) => !followerIds.has(f.followingId))
          .map((f) => f.following);

        // Followers only: They follow me but I don't follow them
        const followersOnly = followers
          .filter((f) => !followingIds.has(f.followerId))
          .map((f) => f.follower);

        const followerCount = followers.length;

        // calculate change (you can replace with real logic)
        const previousCount = followerCount > 0 ? followerCount - 1 : 0; // placeholder
        const change = followerCount - previousCount;
        const trend = change >= 0 ? "up" : "down";

        return {
          friends,
          followingOnly,
          followersOnly,
          followerCount: {
            value: followerCount.toString(),
            change: change,
            trend,
          },
        };
      },
      300, // Cache for 5 minutes
    );
  }, "Error fetching friends and followers");
}

// follow user

export async function followUser({
  followerId,
  followingId,
}: {
  followerId: string;
  followingId: string;
}) {
  return withTryCatch(async () => {
    // Invalidate cache for both users
    await redis.del(`friendsAndFollowers:${followerId}`);
    await redis.del(`friendsAndFollowers:${followingId}`);

    // 1️⃣ Check if follow exists
    let follow = await prisma.follow.findUnique({
      where: { followerId_followingId: { followerId, followingId } },
      include: { follower: true, following: true },
    });

    if (follow) {
      // Restore soft-deleted follow if needed
      if (follow.deletedAt) {
        follow = await prisma.follow.update({
          where: { id: follow.id },
          data: { deletedAt: null },
          include: { follower: true, following: true }, // ✅ match the type
        });
      }
    } else {
      // Create new follow
      follow = await prisma.follow.create({
        data: { followerId, followingId, deletedAt: null },
        include: { follower: true, following: true },
      });
    }
    if (!follow) {
      throw new Error("Follow not found");
    }
    // 2️⃣ Create UserActivity for follower (who followed)
    await prisma.userActivity.create({
      data: {
        userId: followerId,
        type: "FOLLOW",
        followId: follow.id,
        status: "NEW_FOLLOWER",
      } as Prisma.UserActivityUncheckedCreateInput,
    });

    // 3️⃣ Create UserActivity for following (who got followed)
    await prisma.userActivity.create({
      data: {
        userId: followingId,
        type: "FOLLOW",
        followId: follow.id,
        status: "NEW_FOLLOWING",
      } as Prisma.UserActivityUncheckedCreateInput,
    });

    // 4️⃣ Pusher events
    await pusherServer.trigger(
      `private-follow-${followingId}`,
      "new-follower",
      {
        id: follow.id,
        friend: {
          id: follow.follower.id,
          name: follow.follower.name,
          img: follow.follower.img,
        },
        createdAt: follow.createdAt,
      },
    );

    await pusherServer.trigger(
      `private-user-notification-${followingId}`,
      "notification",
      {
        type: "follow",
        friend: {
          id: follow.follower.id,
          name: follow.follower.name,
          img: follow.follower.img,
        },
      },
    );

    await pusherServer.trigger(
      `private-follow-${followerId}`,
      "new-following",
      {
        id: follow.id,
        friend: {
          id: follow.following.id,
          name: follow.following.name,
          img: follow.following.img,
        },
        createdAt: follow.createdAt,
      },
    );

    // 5️⃣ Mutual follow check (ignore soft-deleted)
    const mutual = await prisma.follow.findFirst({
      where: {
        followerId: followingId,
        followingId: followerId,
        deletedAt: null,
      },
      include: { follower: true, following: true },
    });

    if (mutual) {
      // 🔔 UserActivity for follow accepted
      await prisma.userActivity.create({
        data: {
          userId: followerId,
          type: "FOLLOW_ACCEPTED",
          followId: follow.id,
          status: "ACCEPTED",
        } as Prisma.UserActivityUncheckedCreateInput,
      });

      await prisma.userActivity.create({
        data: {
          userId: followingId,
          type: "FOLLOW_ACCEPTED",
          followId: follow.id,
          status: "ACCEPTED",
        } as Prisma.UserActivityUncheckedCreateInput,
      });

      // 🔔 Trigger follow-accepted events
      await pusherServer.trigger(
        `private-follow-${followerId}`,
        "follow-accepted",
        {
          friend: {
            id: follow.following.id,
            name: follow.following.name,
            img: follow.following.img,
          },
          createdAt: new Date(),
        },
      );

      await pusherServer.trigger(
        `private-follow-${followingId}`,
        "follow-accepted",
        {
          friend: {
            id: follow.follower.id,
            name: follow.follower.name,
            img: follow.follower.img,
          },
          createdAt: new Date(),
        },
      );
    }

    return { success: true };
  }, "Error following user");
}

// 🔥 Unfollow user
export async function unfollowUser({
  followerId,
  followingId,
}: {
  followerId: string;
  followingId: string;
}) {
  return withTryCatch(async () => {
    // Invalidate cache for both users
    await redis.del(`friendsAndFollowers:${followerId}`);
    await redis.del(`friendsAndFollowers:${followingId}`);

    const follow = await prisma.follow.findUnique({
      where: { followerId_followingId: { followerId, followingId } },
      include: { follower: true, following: true },
    });

    // 🔔 Create UserActivity for unfollow
    const follows = await prisma.follow.update({
      where: { followerId_followingId: { followerId, followingId } },
      data: { deletedAt: new Date() },
    });
    await prisma.userActivity.create({
      data: {
        userId: followerId,
        type: "UNFOLLOW",
        status: "REMOVED_FOLLOWING",
        followId: follows.id,
      } as Prisma.UserActivityUncheckedCreateInput,
    });

    await prisma.userActivity.create({
      data: {
        userId: followingId,
        type: "UNFOLLOW",
        status: "REMOVED_FOLLOWER",
        followId: follows.id,
      } as Prisma.UserActivityUncheckedCreateInput,
    });

    // 🔔 Trigger Pusher events
    await pusherServer.trigger(
      `private-follow-${followingId}`,
      "removed-follower",
      {
        followerId,
        friend: {
          id: follow?.following.id,
          name: follow?.following.name,
          img: follow?.following.img,
        },
      },
    );

    await pusherServer.trigger(
      `private-follow-${followerId}`,
      "removed-following",
      {
        followingId,
        friend: {
          id: follow?.follower.id,
          name: follow?.follower.name,
          img: follow?.follower.img,
        },
      },
    );
    await pusherServer.trigger(
      `private-user-notification-${followingId}`,
      "notification",
      {
        type: "unfollow",
        friend: {
          id: follow?.follower.id,
          name: follow?.follower.name,
          img: follow?.follower.img,
        },
      },
    );

    return { success: true };
  }, "Error unfollowing user");
}

export async function isFollowing(followerId: string, followingId: string) {
  return withTryCatch(async () => {
    const follow = await prisma.follow.findUnique({
      where: { followerId_followingId: { followerId, followingId } },
    });
    return { isFollowing: !!follow };
  }, "Error checking follow status");
}
