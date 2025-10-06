"use client";

import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { useGetAllJob } from "../hooks/useGetAllJobs";
import { JobCard } from "./Job-Card";
import JobCardSkeleton from "./ui/JobCardSkeleton";
import { CachedUser } from "@/types/global";

export function JobList({ user }: { user: CachedUser }) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error,
    isLoading,
  } = useGetAllJob();

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // IntersectionObserver for infinite scroll
  useEffect(() => {
    if (!hasNextPage || !scrollRef.current || !loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) fetchNextPage();
      },
      {
        root: scrollRef.current, // observe inside scrollable div
        threshold: 0.1,
      },
    );

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);

  if (error) {
    toast.error(error.message);
    return null;
  }

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
    <div ref={scrollRef} className="space-y-4 h-[28rem] overflow-auto">
      {filtered.map((job: any) => (
        <JobCard key={job.id} job={job} user={user} />
      ))}

      <div ref={loadMoreRef} className="h-10 flex justify-center items-center">
        {isFetchingNextPage && <p>Loading...</p>}
        {!hasNextPage && (
          <p className="text-muted-foreground text-sm">No more jobs</p>
        )}
      </div>
    </div>
  );
}
