import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createCommentAction, getCommentsByPostAction } from "../action";
import { CachedUser } from "@/types/global";

// ---------------------
// GET COMMENTS
// ---------------------
export function useComments({ postId }: { postId: string }) {
  return useQuery({
    queryKey: ["comments", postId],
    queryFn: async () => {
      try {
        const comments = await getCommentsByPostAction(postId);
        return comments;
      } catch (error: any) {
        toast.error(error?.message || "Failed to fetch comments");
        throw error;
      }
    },
  });
}

// ---------------------
// CREATE COMMENT
// ---------------------
export function useCreateComment({ user }: { user: CachedUser }) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (args: {
      postId: string;
      authorId: string;
      content: string;
    }) => {
      const comment = await createCommentAction(args);
      return comment;
    },
    onSuccess: (newComment, variables) => {
      queryClient.setQueryData(
        ["comments", variables.postId],
        (old: any[] = []) => [
          ...old,
          {
            ...newComment,
            author: {
              id: variables.authorId,
              name: user?.name || "Unknown",
              img: user?.img || null,
            },
          },
        ],
      );

      toast.success("Comment added!");
    },

    onError: (error: any) => {
      console.error("Failed to create comment", error);
      toast.error(error?.message || "Failed to create comment");
    },
  });
}
