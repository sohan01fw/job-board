"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Play } from "lucide-react";

export function WatchDemoDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="text-gray-900 dark:text-gray-100 hover:bg-gray-900 dark:hover:bg-gray-100 hover:text-white dark:hover:text-gray-900 px-8 py-5 text-lg font-semibold rounded-full flex items-center gap-2 shadow-md transition-all"
        >
          <Play className="h-5 w-5" />
          Watch Demo
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-3xl p-0 overflow-hidden">
        <DialogHeader className="p-4 border-b border-gray-200 dark:border-gray-700">
          <DialogTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Demo Video
          </DialogTitle>
        </DialogHeader>

        <video
          src="/jobvideo.mp4"
          controls
          autoPlay
          className="w-full h-auto bg-black max-h-[80vh] object-contain"
        />

        <DialogClose asChild>
          <Button className="absolute top-3 right-3">Close</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
