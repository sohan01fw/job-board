"use client";

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Calendar,
  Clock,
  DollarSign,
  MapPin,
  Trash2,
  Users,
} from "lucide-react";
import {
  useDeleteMyPost,
  useMyPosts,
} from "@/features/dashboard/discover/hooks/usePost";
import Image from "next/image";
import { ConfirmDialog } from "@/components/confirmDialog";
import PostsLoadingSkeleton from "./ui/PostLoading";

type Props = {
  userId: string;
};

export default function MyPosts({ userId }: Props) {
  const { data: posts, isLoading, isError } = useMyPosts({ userId });
  const { mutateAsync: deletePost, isPending: isDeletingPost } =
    useDeleteMyPost();

  if (isLoading)
    return (
      <div>
        <PostsLoadingSkeleton />
      </div>
    );
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

          {/* Job Details */}
          {post.jobs && (
            <Card className="bg-muted/50 border-l-4 border-l-green-500">
              <CardContent className="p-4">
                <h4 className="font-semibold text-foreground mb-2">
                  {post.jobs.title}
                </h4>
                <p className="text-sm text-muted-foreground mb-2">
                  {post.jobs.company}
                </p>

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {post.jobs.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {post.jobs.jobType} {/* fulltime/parttime etc */}
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    {
                      post.jobs.currency
                    } {post.jobs.minSalary.toLocaleString()} -{" "}
                    {post.jobs.maxSalary.toLocaleString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(
                      post.jobs.applicationDeadline,
                    ).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {post.jobs._count?.jobApplications ?? 0} applicants
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <CardFooter className="flex justify-end mt-5">
            <ConfirmDialog
              title="Delete Post"
              icon={<Trash2 className="w-4 h-4 mr-1" />}
              variant="destructive"
              description="Are u sure u wanna delete this post?"
              confirmTextColor="text-red-600"
              onConfirmAction={async () =>
                await deletePost({ postId: post.id, postImages: post.imageUrl })
              }
              confirmText={isDeletingPost ? "Deleting..." : "Delete"}
            />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
