// hooks/usePosts.ts
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createPostAction,
  deleteMyPostAction,
  getFeedAction,
  getMyPostsAction,
  likePostAction,
} from "../action";
import {
  deleteFilesByUrl,
  uploadMultipleFiles,
} from "@/lib/Actions/UploadMultipleFiles";
import { CachedUser } from "@/types/global";
import { useState } from "react";
import { PostUser } from "../types";

// Define what each page of feed returns
type FeedResponse = {
  posts: PostUser[];
  nextCursor: string | null;
};

export function useFeed() {
  return useInfiniteQuery<FeedResponse, Error>({
    queryKey: ["feed"],
    queryFn: async ({ pageParam }) => {
      // ensure correct type (string | null)
      const cursor = typeof pageParam === "string" ? pageParam : null;

      // backend expects cursor (not skip)
      return await getFeedAction({ cursor, limit: 6 });
    },
    getNextPageParam: (lastPage) => lastPage?.nextCursor ?? null,
    initialPageParam: null,
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

export function useDeleteMyPost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      postId,
      postImages,
    }: {
      postId: string;
      postImages?: string[];
    }) => {
      if (postImages && postImages?.length > 0) {
        console.log("deleting images", postImages);
        await deleteFilesByUrl({
          bucketName: "post-images",
          urls: postImages,
        });
      }
      await deleteMyPostAction({ postId });
      queryClient.invalidateQueries({ queryKey: ["myPosts"] });
      toast.success("Post deleted successfully!");
    },
    onError: (error: any) => {
      console.error("Failed to delete post", error);
      toast.error(error?.message || "Failed to delete post");
    },
  });
}

export function useCreatePost({ userData }: { userData: CachedUser }) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (args: {
      content: string;
      images?: File[];
      jobId?: string | null;
    }) => {
      let uploadedUrls: string[] = [];

      if (args.images && args.images.length > 0) {
        // Upload images first
        uploadedUrls = await uploadMultipleFiles({
          files: args.images,
          bucketName: "post-images",
          authorId: userData.id,
        });
      }

      // Only create post after images are uploaded
      return await createPostAction({
        authorId: userData.id,
        content: args.content,
        imageUrl: uploadedUrls,
        jobId: args.jobId,
      });
    },

    onSuccess: (newPost) => {
      // Update all queries with key "feed"
      queryClient
        .getQueryCache()
        .findAll()
        .forEach((query) => {
          if (query.queryKey[0] === "feed") {
            queryClient.setQueryData(query.queryKey, (oldData: any) => {
              // If using infinite query
              if (oldData?.pages) {
                return {
                  ...oldData,
                  pages: oldData.pages.map((page: any, index: any) =>
                    index === 0
                      ? {
                          ...page,
                          posts: [
                            {
                              ...newPost,
                              author: {
                                id: userData.id,
                                name: userData?.name || "Unknown",
                                img: userData?.img || null,
                              },
                            },
                            ...page.posts,
                          ],
                        }
                      : page,
                  ),
                };
              }

              // Normal query fallback
              const postsArray = oldData?.posts ?? [];
              return {
                ...oldData,
                posts: [
                  {
                    ...newPost,
                    author: {
                      id: userData.id,
                      name: userData?.name || "Unknown",
                      img: userData?.img || null,
                    },
                  },
                  ...postsArray,
                ],
              };
            });
          }
        });

      toast.success("Post created successfully!");
    },
    onError: (error) => {
      console.error("Failed to create post", error);
      toast.error(error?.message || "Failed to create post");
    },
  });
}

export function useLikePost({
  postId,
  userId,
  initialLikes,
  initialIsLiked,
}: {
  postId: string;
  userId: string;
  initialLikes: number;
  initialIsLiked: boolean;
}) {
  const queryClient = useQueryClient();
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [likes, setLikes] = useState(initialLikes);

  const mutation = useMutation({
    mutationFn: async (currentIsLiked: boolean) => {
      // Calls backend to add/remove PostLike and returns updated likes count
      const result = await likePostAction({
        postId,
        userId,
        isLiked: currentIsLiked,
      });
      return result.likes; // likes count returned from server
    },
    onMutate: (currentIsLiked: boolean) => {
      // Optimistic update
      setIsLiked(!currentIsLiked);
      setLikes((prev) => (currentIsLiked ? prev - 1 : prev + 1));
    },

    onError: () => {
      // rollback on error
      setIsLiked(initialIsLiked);
      setLikes(initialLikes);
      toast.error("Failed to like post");
    },
    onSettled: (data) => {
      // update likes from server response
      if (data !== undefined) setLikes(data);
      queryClient.invalidateQueries({ queryKey: ["feed", postId] });
    },
  });

  const likePost = () => mutation.mutate(isLiked);

  return {
    likePost,
    isLiked,
    likes,
    ...mutation,
  };
}
