"use client";

import { useState, useRef } from "react";
import { ImageIcon, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EmojiPicker } from "./ui/EmojiPicker";
import { CachedUser } from "@/types/global";
import { useUserStore } from "@/lib/stores/useUserStatusStore";
import { useCreatePost } from "../hooks/usePost";
import Image from "next/image";
import { AttachJobDialog } from "./ui/AttachJobDialog";
import { useJobStore } from "../lib/stores/JobStore";
import { useGetPostedJobById } from "../../recruiter/hooks/useGetPostedJobs";
import { AttachedJobCard } from "./ui/AttachedJobCard";

export function CreatePost({ userData }: { userData: CachedUser }) {
  const [postContent, setPostContent] = useState("");
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { jobId, clearJobId } = useJobStore();

  const { user } = useUserStore();
  const { mutateAsync: createPost, isPending: isPosting } = useCreatePost({
    userData,
  });

  const { data: job, isLoading: isLoadingJob } = useGetPostedJobById({
    jobId: jobId || "",
    userId: userData.id || "",
  });
  const handlePost = async () => {
    if (!postContent.trim() && selectedImages.length === 0) return;

    await createPost({
      content: postContent,
      images: selectedImages,
      jobId: jobId ?? null,
    });

    // Reset UI states immediately
    setPostContent("");
    setSelectedImages([]);
    setImagePreviews([]);
    clearJobId();
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files).filter(
      (f) => f.size <= 5 * 1024 * 1024,
    ); // 5MB max
    setSelectedImages((prev) => [...prev, ...files]);
    setImagePreviews((prev) => [
      ...prev,
      ...files.map((f) => URL.createObjectURL(f)),
    ]);
  };

  return (
    <Card className="shadow-sm border rounded-2xl">
      <CardContent className="p-3">
        <div className="flex gap-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={userData.img || "/placeholder-avatar.png"} />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>

          <div className="flex-1 flex-wrap overflow-x-auto space-y-2">
            <Textarea
              placeholder="What's on your mind?"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              className="min-h-[80px] resize-none rounded-xl border bg-muted/20 p-5 text-sm placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-primary m-1 max-w-[98%]"
            />

            {/* Image previews */}
            {imagePreviews.length > 0 && (
              <div className="flex gap-2 mt-2 overflow-x-auto">
                {imagePreviews.map((src, i) => (
                  <div
                    key={i}
                    className="relative w-40 h-40 rounded-xl overflow-hidden border bg-muted/20 flex-shrink-0"
                  >
                    <Image
                      src={src}
                      alt="Selected"
                      width={250}
                      height={250}
                      className="w-full h-full object-contain"
                    />
                    <button
                      className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 hover:bg-black/70"
                      onClick={() => {
                        setSelectedImages((prev) =>
                          prev.filter((_, idx) => idx !== i),
                        );
                        setImagePreviews((prev) =>
                          prev.filter((_, idx) => idx !== i),
                        );
                      }}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            {/*to show attached job*/}
            {job && (
              <AttachedJobCard
                title={job.title}
                company={job.company}
                location={job.location}
                minSalary={job.minSalary}
                maxSalary={job.maxSalary}
                currency={job.currency}
                applicationDeadline={job.applicationDeadline}
                applicants={job._count?.jobApplications ?? 0}
              />
            )}

            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-1.5 mb-5">
                {/* Image upload */}
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleImageSelect}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 text-muted-foreground hover:text-primary"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <ImageIcon className="w-4 h-4" />
                  <span className="hidden sm:inline">Photo</span>
                </Button>

                {user?.status === "HIRING" && (
                  <AttachJobDialog
                    userId={userData.id!}
                    loading={isLoadingJob}
                  />
                )}

                <EmojiPicker
                  text="Feeling"
                  onSelectAction={(emoji) =>
                    setPostContent((prev) => prev + emoji)
                  }
                />
              </div>

              <Button
                onClick={handlePost}
                disabled={
                  isPosting ||
                  (postContent.trim().length === 0 &&
                    selectedImages.length === 0)
                }
                className="h-8 px-4 rounded-full bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
              >
                {isPosting ? "Posting..." : "Post"}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
