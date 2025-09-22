"use server";

import { User } from "@prisma/client";
import {
  createCommentQuery,
  createPost,
  deleteMyPost,
  followUser,
  getAllUsersExceptQuery,
  getCommentsByPostQuery,
  getFeed,
  getFriendsAndFollowers,
  getMyPosts,
  isFollowing,
  likePostQuery,
  unfollowUser,
} from "./lib/query";

// Wrap server-only queries in actions for client calls
export async function createPostAction(args: {
  authorId: string;
  content: string;
  imageUrl?: string[];
}) {
  return createPost(args);
}

export async function getFeedAction(args?: { limit?: number; skip?: number }) {
  return getFeed(args || {});
}
export async function getMyPostsAction(args: {
  userId: string;
  limit?: number;
  skip?: number;
}) {
  return getMyPosts(args);
}
export async function deleteMyPostAction(postId: string) {
  return deleteMyPost(postId);
}

export async function likePostAction({
  postId,
  isLiked,
  likes,
}: {
  postId: string;
  isLiked: boolean;
  likes: number;
}) {
  return likePostQuery({ postId, isLiked, likes });
}
// Wrap server-only queries in actions
export async function createCommentAction(args: {
  postId: string;
  authorId: string;
  content: string;
}) {
  return createCommentQuery(args);
}

export async function getCommentsByPostAction(postId: string) {
  return getCommentsByPostQuery(postId);
}

export async function getAllUsersExceptAction(
  currentUserId: string,
): Promise<User[]> {
  return await getAllUsersExceptQuery(currentUserId);
}

export async function isFollowingAction(args: {
  followerId: string;
  followingId: string;
}) {
  return await isFollowing(args.followerId, args.followingId);
}

export async function followUserAction(args: {
  followerId: string;
  followingId: string;
}) {
  return await followUser(args.followerId, args.followingId);
}

export async function unfollowUserAction(args: {
  followerId: string;
  followingId: string;
}) {
  return await unfollowUser(args.followerId, args.followingId);
}
export async function getFriendsAndFollowersAction(userId: string) {
  return await getFriendsAndFollowers(userId);
}
