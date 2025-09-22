"use client";

import { create } from "zustand";

type PostLikeState = {
  isLiked: boolean;
  likes: number;
};

type LikeStore = {
  likesByPost: Record<string, PostLikeState>;
  toggleLike: (postId: string) => void;
  setLikeState: (postId: string, isLiked: boolean, likes: number) => void;
};

export const useLikeStore = create<LikeStore>((set) => ({
  likesByPost: {},

  toggleLike: (postId) =>
    set((state) => {
      const current = state.likesByPost[postId];
      if (!current) return state; // no data yet
      return {
        likesByPost: {
          ...state.likesByPost,
          [postId]: {
            isLiked: !current.isLiked,
            likes: current.isLiked
              ? Math.max(0, current.likes - 1)
              : current.likes + 1,
          },
        },
      };
    }),

  setLikeState: (postId, isLiked, likes) =>
    set((state) => ({
      likesByPost: {
        ...state.likesByPost,
        [postId]: { isLiked, likes },
      },
    })),
}));
