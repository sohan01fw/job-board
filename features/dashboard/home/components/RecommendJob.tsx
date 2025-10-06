"use client";

import { Building2, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { useRecommendedJobs } from "../hooks/useJobRecommended";
import RecommendJobSkeleton from "./ui/RecomendJobSkeleton";
import { useUserStore } from "@/lib/stores/useUserStatusStore";
import { DisabledBtnTooltip } from "@/components/Tooltip";
import ApplyDialog from "../../jobs/components/ui/JobApplyModel";
import { CachedUser } from "@/types/global";

export default function RecommendJob({ user }: { user: CachedUser }) {
  const {
    user: { status },
  } = useUserStore();
  const { data: recomendedJobs, isLoading, isError } = useRecommendedJobs(5);

  if (isLoading) return <RecommendJobSkeleton />;

  if (isError || !recomendedJobs) return <p>Failed to load recommended jobs</p>;
  if (recomendedJobs.length === 0)
    return <p>No recommended jobs.Cause there is no any job left!</p>;

  return (
    <div className="space-y-4">
      {recomendedJobs.map((job: any, index: number) => (
        <div
          key={index}
          className="p-4 border rounded-lg hover:shadow-sm transition-shadow"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <Building2
                  className="h-4 w-4 text-muted-foreground"
                  aria-hidden="true"
                />
                <span className="text-sm font-medium text-foreground">
                  {job?.company}
                </span>
                <Badge
                  variant="outline"
                  className="bg-green-50 text-green-700 border-green-200"
                >
                  {job?.matchPercent}% match
                </Badge>
              </div>
              <h3 className="font-semibold text-foreground mb-1">
                {job?.title}
              </h3>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <MapPin className="h-3 w-3" aria-hidden="true" />
                  <span>{job?.location}</span>
                </div>
                <span>•</span>
                <span>{job?.workType}</span>
                <span>•</span>
                <span>
                  {job?.createdAt &&
                    formatDistanceToNow(new Date(job.createdAt), {
                      addSuffix: true,
                    })}
                </span>
              </div>
            </div>

            {user &&
              (status !== "OPENTOWORK" ? (
                <DisabledBtnTooltip>
                  <Button
                    asChild
                    size="sm"
                    disabled
                    className="ml-4 bg-green-600 hover:bg-green-700"
                  >
                    Apply
                  </Button>
                </DisabledBtnTooltip>
              ) : (
                <ApplyDialog job={job} user={user} />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
