"use client";

import { toast } from "sonner";
import { useGetAllJob } from "../hooks/useGetAllJobs";
import { JobCard } from "./Job-Card";
import JobCardSkeleton from "./ui/JobCardSkeleton";
import { useEffect, useRef } from "react";

export function JobList() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error,
    isLoading,
  } = useGetAllJob();

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    if (!hasNextPage) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) fetchNextPage();
      },
      { threshold: 1.0 },
    );

    if (loadMoreRef.current) observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);

  if (error) return toast.error(error.message);
  if (isLoading)
    return (
      <>
        <JobCardSkeleton />
        <JobCardSkeleton />
        <JobCardSkeleton />
      </>
    );

  // ✅ Fix typing: assert `data` as InfiniteData<JobsResponse>
  const jobs = (data as any)?.pages.flatMap((page: any) => page.jobs) ?? [];

  const filtered = jobs.filter((job: any) => job.applied === false);

  if (filtered.length === 0) return <div>No jobs found</div>;

  return (
    <div className="space-y-4 h-[28rem] overflow-auto">
      {filtered.map((job: any) => (
        <JobCard key={job.id} job={job} />
      ))}

      {/* Infinite scroll trigger */}
      <div ref={loadMoreRef} className="h-10 flex justify-center items-center">
        {isFetchingNextPage && <p>Loading...</p>}
        {!hasNextPage && (
          <p className="text-muted-foreground text-sm">No more jobs</p>
        )}
      </div>
    </div>
  );
}
