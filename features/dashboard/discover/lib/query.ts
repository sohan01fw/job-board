"use server";

import { prisma } from "@/lib/Prisma";
import { withTryCatch } from "@/lib/tryCatch";
import { Post, Prisma, User } from "@prisma/client";
import { PostUser, UserCmts } from "../types";
import { pusherServer } from "@/lib/pusher";

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
  jobId?: string;
}): Promise<Post> {
  return withTryCatch(async () => {
    return prisma.post.create({
      data: {
        authorId,
        content,
        imageUrl,
        jobsId: jobId,
      },
    });
  }, "Error while creating post");
}

// ---------------------
// GET FEED (latest posts)
// ---------------------

export async function getFeed({
  limit = 20,
  skip = 0,
}: {
  limit?: number;
  skip?: number;
}): Promise<PostUser[]> {
  return withTryCatch(async () => {
    return prisma.post.findMany({
      take: limit,
      skip,
      orderBy: { createdAt: "desc" },
      include: {
        author: true,
        comments: true,
        postlikes: true,
        jobs: {
          include: {
            _count: {
              select: {
                jobApplications: true,
              },
            },
          },
        },
      },
    });
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
      },
    });
  }, "Error while fetching my posts");
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
    // Mutual friends

    const friends = await prisma.follow.findMany({
      where: {
        followerId: userId, // I follow them
        deletedAt: null,
        followingId: {
          // AND they follow me
          in: await prisma.follow
            .findMany({
              where: {
                followerId: { not: userId },
                followingId: userId,
                deletedAt: null,
              },
              select: { followerId: true },
            })
            .then((rows) => rows.map((r) => r.followerId)),
        },
      },
      include: { following: true },
    });

    // Following only: I follow them but they don't follow me

    const followingOnly = await prisma.follow.findMany({
      where: {
        followerId: userId, // I follow them
        deletedAt: null,
        followingId: {
          notIn: await prisma.follow
            .findMany({
              where: {
                followerId: { not: userId },
                followingId: userId,
                deletedAt: null,
              }, // people who follow me
              select: { followerId: true },
            })
            .then((rows) => rows.map((r) => r.followerId)),
        },
      },
      include: { following: true },
    });

    // Followers only: They follow me but I don't follow them
    const followersOnly = await prisma.follow.findMany({
      where: {
        followingId: userId, // they follow me
        deletedAt: null,
        followerId: {
          notIn: await prisma.follow
            .findMany({
              where: { followerId: userId, deletedAt: null }, // people I follow
              select: { followingId: true },
            })
            .then((rows) => rows.map((r) => r.followingId)),
        },
      },
      include: { follower: true },
    });

    return {
      friends: friends.map((f) => f.following),
      followingOnly: followingOnly.map((f) => f.following),
      followersOnly: followersOnly.map((f) => f.follower),
    };
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
        follower: {
          id: follow.follower.id,
          name: follow.follower.name,
          img: follow.follower.img,
        },
        createdAt: follow.createdAt,
      },
    );

    await pusherServer.trigger(
      `private-follow-${followerId}`,
      "new-following",
      {
        id: follow.id,
        following: {
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
    // 🔔 Create UserActivity for unfollow
    const follow = await prisma.follow.update({
      where: { followerId_followingId: { followerId, followingId } },
      data: { deletedAt: new Date() },
    });
    await prisma.userActivity.create({
      data: {
        userId: followerId,
        type: "UNFOLLOW",
        status: "REMOVED_FOLLOWING",
        followId: follow.id,
      } as Prisma.UserActivityUncheckedCreateInput,
    });

    await prisma.userActivity.create({
      data: {
        userId: followingId,
        type: "UNFOLLOW",
        status: "REMOVED_FOLLOWER",
        followId: follow.id,
      } as Prisma.UserActivityUncheckedCreateInput,
    });

    // 🔔 Trigger Pusher events
    await pusherServer.trigger(
      `private-follow-${followingId}`,
      "removed-follower",
      { followerId },
    );

    await pusherServer.trigger(
      `private-follow-${followerId}`,
      "removed-following",
      { followingId },
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
