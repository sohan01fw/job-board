"use client";

import { useState } from "react";
import { Heart, MessageCircle, Share2 } from "lucide-react";
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

interface PostCardProps {
  post: PostUser;
}

export function PostCard({ post }: PostCardProps) {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const { mutate: createComment } = useCreateComment();
  const { data: comments } = useComments({ postId: post.id });
  const {
    mutate: likePost,
    isLiked,
    likes,
  } = useLikePost(post.id, post.isLiked, post.likes);

  const handleSubmitComment = () => {
    if (commentText.trim()) {
      createComment({
        postId: post.id,
        authorId: post.author.id,
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
                <Badge variant="secondary" className="text-xs">
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

          {/* Job Details */}
          {/*{post.type === "job" && post.jobDetails && (
            <Card className="bg-muted/50 border-l-4 border-l-primary">
              <CardContent className="p-4">
                <h4 className="font-semibold text-foreground mb-2">
                  {post.jobDetails.title}
                </h4>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {post.jobDetails.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {post.jobDetails.type}
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    {post.jobDetails.salary}
                  </div>
                </div>
                <Button size="sm" className="mt-3">
                  Apply Now
                </Button>
              </CardContent>
            </Card>
          )}*/}

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
                {comments?.length}
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
