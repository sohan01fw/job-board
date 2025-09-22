"use client";

import { create } from "zustand";

export type Comment = {
  id: string;
  postId: string;
  authorId: string;
  content: string;
  createdAt: string;
  optimistic?: boolean;
};

type CommentsStore = {
  commentsByPost: Record<string, Comment[]>;
  setComments: (postId: string, comments: Comment[]) => void;
  addComment: (postId: string, comment: Comment) => void;
  rollbackComments: (postId: string, prev: Comment[]) => void;
};

export const useCommentsStore = create<CommentsStore>((set) => ({
  commentsByPost: {},

  setComments: (postId, comments) =>
    set((state) => ({
      commentsByPost: { ...state.commentsByPost, [postId]: comments },
    })),

  addComment: (postId, comment) =>
    set((state) => ({
      commentsByPost: {
        ...state.commentsByPost,
        [postId]: [...(state.commentsByPost[postId] || []), comment],
      },
    })),

  rollbackComments: (postId, prev) =>
    set((state) => ({
      commentsByPost: { ...state.commentsByPost, [postId]: prev },
    })),
}));
