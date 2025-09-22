// hooks/usePosts.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createPostAction,
  deleteMyPostAction,
  getFeedAction,
  getMyPostsAction,
  likePostAction,
} from "../action";
import { useLikeStore } from "../lib/stores/FeedStore";
import { useEffect } from "react";

export function useFeed(params?: { limit?: number; skip?: number }) {
  return useQuery({
    queryKey: ["feed", params],
    queryFn: async () => {
      return await getFeedAction(params);
    },
  });
}
export function useMyPosts(params: {
  userId: string;
  limit?: number;
  skip?: number;
}) {
  return useQuery({
    queryKey: ["myPosts", params],
    queryFn: async () => {
      return await getMyPostsAction(params);
    },
  });
}

export function useDeleteMyPost(postId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await deleteMyPostAction(postId);
      queryClient.invalidateQueries({ queryKey: ["myPosts"] });
      toast.success("Post deleted successfully!");
    },
    onError: (error: any) => {
      console.error("Failed to delete post", error);
      toast.error(error?.message || "Failed to delete post");
    },
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (args: {
      authorId: string;
      content: string;
      imageUrl?: string[];
    }) => {
      // create the post
      await createPostAction(args);

      // optionally, you could add extra logging or activities here if needed
      // await createUserActivities({ userId: args.authorId, type: "POST_CREATED", postId: post.id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feed"] });
      toast.success("Post created successfully!");
    },
    onError: (error: any) => {
      console.error("Failed to create post", error);
      toast.error(error?.message || "Failed to create post");
    },
  });
}

export function useLikePost(
  postId: string,
  initialIsLiked: boolean,
  initialLikes: number,
) {
  const { toggleLike, setLikeState, likesByPost } = useLikeStore();
  const state = likesByPost[postId];

  // set initial state once when PostCard mounts
  useEffect(() => {
    setLikeState(postId, initialIsLiked, initialLikes);
  }, [postId, initialIsLiked, initialLikes, setLikeState]);

  return {
    ...useMutation({
      mutationFn: async () => {
        if (!state) return;
        return await likePostAction({
          postId,
          isLiked: state.isLiked,
          likes: state.likes,
        });
      },
      onMutate: () => {
        toggleLike(postId); // optimistic update
      },
      onError: (error) => {
        toggleLike(postId); // rollback
        toast.error(error?.message || "Failed to like post");
      },
    }),
    isLiked: state?.isLiked ?? initialIsLiked,
    likes: state?.likes ?? initialLikes,
  };
}
