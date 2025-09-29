"use client";

import { toast } from "sonner";
import { useFeed } from "../hooks/usePost";
import { PostCard } from "./PostCard";
import { CachedUser } from "@/types/global";

export function PostList({ userData }: { userData: CachedUser }) {
  const { data: postsData, isLoading, isError } = useFeed();

  if (isError) return toast.error("Error fetching feed");
  if (isLoading) return <div>Loading...</div>;
  if (!postsData?.length) return <div>No posts found</div>;

  return (
    <div className="space-y-6">
      {postsData.map((post) => (
        <PostCard key={post.id} post={post} currentUser={userData} />
      ))}
    </div>
  );
}
