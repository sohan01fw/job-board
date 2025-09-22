"use server";

import { prisma } from "@/lib/Prisma";
import { withTryCatch } from "@/lib/tryCatch";
import { Post, User } from "@prisma/client";
import { PostUser, UserCmts } from "../types";

// ---------------------
// CREATE POST
// ---------------------
export async function createPost({
  authorId,
  content,
  imageUrl,
}: {
  authorId: string;
  content: string;
  imageUrl?: string[];
}): Promise<Post> {
  return withTryCatch(async () => {
    return prisma.post.create({
      data: {
        authorId,
        content,
        imageUrl,
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
      include: { author: true, comments: true },
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
  isLiked,
  likes,
}: {
  postId: string;
  isLiked: boolean;
  likes: number;
}) =>
  withTryCatch(async () => {
    return prisma.post.update({
      where: { id: postId },
      data: {
        isLiked: isLiked,
        likes: likes,
      },
    });
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
        followingId: {
          // AND they follow me
          in: await prisma.follow
            .findMany({
              where: { followerId: { not: userId }, followingId: userId },
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
        followingId: {
          notIn: await prisma.follow
            .findMany({
              where: { followerId: { not: userId }, followingId: userId }, // people who follow me
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
        followerId: {
          notIn: await prisma.follow
            .findMany({
              where: { followerId: userId }, // people I follow
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

export async function followUser(followerId: string, followingId: string) {
  return withTryCatch(async () => {
    await prisma.follow.create({
      data: { followerId, followingId },
    });
    return { success: true };
  }, "Error following user");
}

export async function unfollowUser(followerId: string, followingId: string) {
  return withTryCatch(async () => {
    await prisma.follow.delete({
      where: { followerId_followingId: { followerId, followingId } },
    });
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
