"use client";
import { toast } from "sonner";
import { useGetAllJob } from "../hooks/useGetAllJobs";
import { JobCard } from "./Job-Card";
// import { colors } from "../lib/constant";

export function JobList() {
  const { data, isLoading, error } = useGetAllJob();
  const jobs = data?.filter((job) => job.applied === false);

  if (error) return toast.error(error.message);

  if (isLoading) return <div>Loading...</div>;

  if (jobs?.length === 0) return <div>No jobs found</div>;
  return (
    <div className="space-y-4">
      <div className="space-y-4 h-[28rem] overflow-auto">
        {jobs?.map((job, index) => (
          <JobCard
            key={index}
            job={job}
            // color={colors[Math.floor(Math.random() * colors.length)]}
          />
        ))}
      </div>
    </div>
  );
}
