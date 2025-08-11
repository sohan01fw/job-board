import { AppliedJobForm } from "@/features/dashboard/components/AppliedJobForm";
import { getJobsFromId } from "@/features/jobs/actions";

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const id = (await params).slug;
  const getJob = await getJobsFromId(id);
  return (
    <div className="w-full m-10 flex justify-center">
      <AppliedJobForm jobform={getJob} />
    </div>
  );
}
