"use client";

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { useMyPosts } from "@/features/dashboard/discover/hooks/usePost";
import { deleteMyPostAction } from "@/features/dashboard/discover/action";
import Image from "next/image";

type Props = {
  userId: string;
};

export default function MyPosts({ userId }: Props) {
  const queryClient = useQueryClient();
  const { data: posts, isLoading, isError } = useMyPosts({ userId });

  const deleteMutation = useMutation({
    mutationFn: async (postId: string) => {
      return await deleteMyPostAction(postId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myPosts"] });
    },
  });

  if (isLoading) return <div>Loading your posts...</div>;
  if (isError) return <div>Error loading posts</div>;
  if (!posts?.length) return <div>No posts yet.</div>;

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <Card key={post.id} className="shadow-sm">
          <CardHeader className="flex flex-row items-center gap-3">
            <Avatar>
              <AvatarImage src={post.author.img || "/placeholder.svg"} />
              <AvatarFallback>
                {post.author.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-sm">{post.author.name}</p>
              <p className="text-xs text-muted-foreground">
                {new Date(post.createdAt).toLocaleString()}
              </p>
            </div>
          </CardHeader>

          <CardContent>
            <p className="text-sm">{post.content}</p>
            {post.imageUrl?.length > 0 && (
              <div className="mt-2 grid grid-cols-2 gap-2">
                {post.imageUrl.map((url, i) => (
                  <Image
                    key={i}
                    src={url}
                    alt="Post image"
                    width={250}
                    height={250}
                    className="rounded-lg object-cover w-full"
                  />
                ))}
              </div>
            )}
          </CardContent>

          <CardFooter className="flex justify-end">
            <Button
              variant="destructive"
              size="sm"
              onClick={() => deleteMutation.mutate(post.id)}
              disabled={deleteMutation.isPending}
            >
              <Trash2 className="w-4 h-4 mr-1" />
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
