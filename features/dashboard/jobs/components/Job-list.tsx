"use client";
import { toast } from "sonner";
import { useGetAllJob } from "../hooks/useGetAllJobs";
import { JobCard } from "./Job-Card";

export function JobList() {
  const { data: jobs, isLoading, error } = useGetAllJob();

  if (error) return toast.error(error.message);

  if (isLoading) return <div>Loading...</div>;

  if (jobs?.length === 0) return <div>No jobs found</div>;
  return (
    <div className="space-y-4">
      <div className="space-y-4 h-80 overflow-auto">
        {jobs?.map((job, index) => (
          <JobCard key={index} {...job} />
        ))}
      </div>
    </div>
  );
}
