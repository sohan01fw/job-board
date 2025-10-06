"use client";

import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { useFeed } from "../hooks/usePost";
import { PostCard } from "./PostCard";
import { CachedUser } from "@/types/global";
import PostsLoadingSkeleton from "./ui/PostLoading";
import { Loader2 } from "lucide-react";

export function PostList({ userData }: { userData: CachedUser }) {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useFeed();
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // Flatten all posts
  const posts = data?.pages.flatMap((page: any) => page?.posts) ?? [];

  // Intersection Observer for infinite scroll
  useEffect(() => {
    if (!hasNextPage) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );

    if (loadMoreRef.current) observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);

  // UI states
  if (isError) return toast.error("Error fetching feed");
  if (isLoading)
    return (
      <div>
        <PostsLoadingSkeleton />
      </div>
    );
  if (!posts.length) return <div className="text-center ">No posts found</div>;

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} currentUser={userData} />
      ))}

      <div ref={loadMoreRef} className="h-5 flex justify-center items-center">
        {isFetchingNextPage ? (
          <span className="mt-3">
            <Loader2 className="w-8 h-8 text-green-600 animate-spin" />
          </span>
        ) : hasNextPage ? (
          <span>Scroll to load more</span>
        ) : (
          <span>No more posts</span>
        )}
      </div>
    </div>
  );
}
