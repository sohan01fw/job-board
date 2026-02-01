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
      <div className="space-y-4 px-1">
        <JobCardSkeleton />
        <JobCardSkeleton />
        <JobCardSkeleton />
      </div>
    );

  const jobs = (data as any)?.pages.flatMap((page: any) => page.jobs) ?? [];
  const filtered = jobs.filter((job: any) => job.applied === false);

  if (filtered.length === 0) return (
    <div className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed rounded-3xl">
      <p className="text-muted-foreground">No jobs found matching your criteria.</p>
    </div>
  );

  return (
    <div ref={scrollRef} className="space-y-4 h-[calc(100vh-280px)] overflow-y-auto px-1 pr-2 no-scrollbar">
      {filtered.map((job: any) => (
        <JobCard key={job.id} job={job} user={user} />
      ))}

      <div ref={loadMoreRef} className="py-8 flex justify-center items-center">
        {isFetchingNextPage ? (
          <div className="flex items-center gap-2 text-primary">
            <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
            <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
            <span className="w-2 h-2 bg-primary rounded-full animate-bounce" />
          </div>
        ) : !hasNextPage ? (
          <p className="text-muted-foreground text-sm font-medium">✨ You&apos;ve reached the end of the list</p>
        ) : null}
      </div>
    </div>
  );
}
