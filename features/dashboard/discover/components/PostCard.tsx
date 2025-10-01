"use client";

import { useState } from "react";
import {
  Calendar,
  Clock,
  DollarSign,
  Heart,
  MapPin,
  MessageCircle,
  Share2,
  Users,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { PostUser } from "../types";
import { useComments, useCreateComment } from "../hooks/useComment";
import { ShowComments } from "./ui/ShowComments";
import { useLikePost } from "../hooks/usePost";
import { CachedUser } from "@/types/global";
import JobViewModel from "../../jobs/components/ui/JobViewModel";

interface PostCardProps {
  post: PostUser;
  currentUser: CachedUser;
}

export function PostCard({ post, currentUser }: PostCardProps) {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const { mutate: createComment } = useCreateComment({ user: currentUser });
  const { data: comments } = useComments({ postId: post.id });

  const initialIsLiked =
    post?.postlikes?.some((like) => like.userId === currentUser.id) ?? false;
  const initialLikes = post?.postlikes?.length ?? 0;

  const { likePost, isLiked, likes } = useLikePost({
    postId: post.id,
    userId: currentUser.id,
    initialLikes,
    initialIsLiked,
  });
  const handleSubmitComment = () => {
    if (commentText.trim()) {
      createComment({
        postId: post.id,
        authorId: currentUser.id,
        content: commentText,
      });
      setCommentText("");
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <Avatar className="w-12 h-12">
            <AvatarImage src={post.author.img || "/placeholder.svg"} />
            <AvatarFallback>{"A"}</AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-foreground truncate">
                {post.author.name}
              </h3>

              {post.author.status === "HIRING" && (
                <Badge
                  variant="secondary"
                  className="text-xs bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                >
                  Hiring
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground truncate">
              {post.author.name}
            </p>
            <p className="text-xs text-muted-foreground">
              {post.createdAt.toLocaleDateString()}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-4">
          <p className="text-foreground leading-relaxed">{post.content}</p>

          {/* Post Image */}

          {post.imageUrl && post.imageUrl.length > 0 && (
            <div className="flex gap-2 overflow-x-auto rounded-lg">
              {post.imageUrl.map((url, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-64 h-64 rounded-lg overflow-hidden"
                >
                  <Image
                    src={url}
                    alt={`Post image ${i + 1}`}
                    className="w-full h-full object-cover"
                    width={256}
                    height={256}
                  />
                </div>
              ))}
            </div>
          )}

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

                <div className="mt-5">
                  <JobViewModel job={post.jobs} />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Interaction Buttons */}
          <div className="flex items-center justify-between pt-2 border-t">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => likePost()}
                className={cn(
                  "gap-2 hover:text-red-500",
                  isLiked && "text-red-500",
                )}
              >
                <Heart className={cn("w-4 h-4", isLiked && "fill-current")} />
                {likes}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowComments(!showComments)}
                className="gap-2 hover:text-primary"
              >
                <MessageCircle className="w-4 h-4" />
                {comments?.length ?? <div>loading...</div>}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="gap-2 hover:text-primary"
              >
                <Share2 className="w-4 h-4" />
                Share
              </Button>
            </div>
          </div>

          {/* Comments Section */}
          {showComments && (
            <div className="space-y-3 pt-3 border-t">
              <div className="flex gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/user-avatar.jpg" />
                  <AvatarFallback>You</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <Textarea
                    placeholder="Write a comment..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="min-h-[80px] resize-none"
                  />
                  <div className="flex justify-end">
                    <Button
                      size="sm"
                      onClick={handleSubmitComment}
                      disabled={!commentText.trim()}
                    >
                      Comment
                    </Button>
                  </div>
                  <ShowComments postId={post.id} />
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
