"use client";

import {
  MapPin,
  Clock,
  Users,
  SquareArrowOutUpRight,
  FileText,
  Trash2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PostedJobsType } from "../types";
import Link from "next/link";
import { useDeleteJob, usePostedJobs } from "../hooks/useGetPostedJobs";
import { PostedJobSkeleton } from "./ui/PostedJobSkeleton";
import { ConfirmDialog } from "@/components/confirmDialog";
import { useUserStore } from "@/lib/stores/useUserStatusStore";

export function PostedJobs({ userId }: { userId: string }) {
  const { data: jobs, isLoading, isError } = usePostedJobs({ userId });
  const { mutateAsync: deleteJob, isPending: isDeleting } = useDeleteJob();
  const {
    user: { status },
  } = useUserStore();

  if (isLoading)
    return (
      <div>
        <PostedJobSkeleton />
      </div>
    );
  if (isError) return <div>Error</div>;

  if (!jobs || jobs.length === 0) return <div>No jobs found</div>;

  return (
    <div>
      <div className="space-y-4 h-[30rem] overflow-auto">
        {jobs?.map((job: PostedJobsType, index: number) => (
          <Card
            key={index}
            className="p-6 hover:shadow-lg transition-all rounded-2xl"
          >
            <CardContent className="p-0">
              {/* Header */}
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center font-bold text-primary">
                    {job.company[0]}
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg">{job.company}</h3>
                    <p className="text-xs text-muted-foreground">
                      {job.contactEmail}
                    </p>
                  </div>
                </div>

                <div className="flex flex-row gap-2">
                  {status === "HIRING" && (
                    <ConfirmDialog
                      icon={<Trash2 className="w-2 h-6" />}
                      variant="destructive"
                      description="Are u sure to Delete this Post?"
                      onConfirmAction={async () => {
                        await deleteJob({ jobId: job.id });
                      }}
                      confirmText={
                        isDeleting ? "Deleting..." : "delete job post"
                      }
                      confirmTextColor="bg-red-500 "
                    />
                  )}
                </div>
              </div>

              {/* Title & Badges */}
              <div className="mb-4">
                <h4 className="text-xl font-bold text-foreground mb-2">
                  {job.title}
                </h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">{job.workType}</Badge>
                  <Badge variant="secondary">{job.jobType}</Badge>
                  <Badge variant="outline">{job.experience}</Badge>
                </div>
              </div>

              {/* Meta info */}
              <div className="flex gap-10 text-sm text-muted-foreground mb-5">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 " />
                  {job.location}
                </div>

                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  Apply by {job.applicationDeadline}
                </div>
              </div>

              {/* Salary */}
              <p className="font-medium text-foreground mb-5">
                <span className="text-green-500">$</span> {job.minSalary} -{" "}
                {job.maxSalary} {job.currency}
              </p>

              <div className="flex items-start gap-2">
                <FileText className="w-4 h-4 mt-1 flex-shrink-0" />
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {job.description}
                </p>
              </div>

              {/* Footer */}

              <Link
                href={`applicants?job_id=${job.id}`}
                className={`${status !== "HIRING" && "pointer-events-none opacity-50"} flex items-center justify-between gap-2 mt-2 w-48 p-2 text-sm font-medium text-muted-foreground bg-gray-50 dark:bg-gray-800 hover:dark:bg-gray-700 rounded-lg hover:bg-gray-100 transition-colors`}
              >
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  <span>{`${job._count.jobApplications} Applicants`}</span>
                </div>
                <Button size="icon" variant="ghost" className="p-1">
                  <SquareArrowOutUpRight className="w-4 h-4 text-primary" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
