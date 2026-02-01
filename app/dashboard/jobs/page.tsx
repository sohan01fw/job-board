import { JobBoard } from "@/features/dashboard/jobs/components/JobBoard";

export default async function Jobs() {
  return (
    <div className="md:m-5 flex-1 min-h-0">
      <JobBoard />
    </div>
  );
}
