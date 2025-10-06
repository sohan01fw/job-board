// components/AttachJobDialog.tsx
"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Briefcase, Plus } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePostedJobs } from "@/features/dashboard/recruiter/hooks/useGetPostedJobs";
import { useJobStore } from "../../lib/stores/JobStore";
import { useGetUserPostsWithJobs } from "../../hooks/usePost";

interface AttachJobDialogProps {
  userId: string;
  loading: any;
}

export function AttachJobDialog({
  userId,
  loading: jobLoading,
}: AttachJobDialogProps) {
  const [open, setOpen] = useState(false);
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { data } = usePostedJobs({ userId }); // your hook
  const { setJobId } = useJobStore();
  const { data: getPost, isLoading: isLoadingPost } = useGetUserPostsWithJobs({
    userId,
  });

  // fetch jobs only when dialog opens

  useEffect(() => {
    if (!open) return;

    setLoading(true);
    const fetchJobs = async () => {
      try {
        // ✅ get all posted job IDs
        const postedJobIds = getPost?.data
          ?.filter((p) => p.jobsId)
          .map((p) => p.jobsId);

        // ✅ filter out already posted jobs
        const availableJobs = (data || []).filter(
          (job) => !postedJobIds?.includes(job.id),
        );

        setJobs(availableJobs);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [open, userId, data, getPost]);

  if (isLoadingPost) return <div>Loading...</div>;
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2 text-muted-foreground hover:text-primary"
        >
          <Briefcase className="w-4 h-4" />
          <span className="hidden sm:inline">
            {jobLoading ? "Loading Job..." : "Attach Job"}
          </span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <DialogHeader>
          <DialogTitle>Attach a Available Job</DialogTitle>
          <DialogDescription>
            Select one of your posted jobs to attach to this post. Only one job
            can be attached.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6">
          {loading ? (
            <p className="text-gray-500 dark:text-gray-400">Loading jobs...</p>
          ) : jobs.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">
              You have no jobs posted yet.
            </p>
          ) : (
            <ScrollArea className="h-80">
              <ul className="space-y-3">
                {jobs.map((job) => (
                  <li key={job.id}>
                    <div className="flex justify-between items-center w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                      <span className="font-medium">{job.title}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex items-center gap-1"
                        onClick={() => {
                          setJobId(job.id);
                          setOpen(false);
                        }}
                      >
                        <Plus size={14} /> Attach
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
