import { AppliedJobForm } from "@/components/pages/dashboard/AppliedJobForm";
import { getJobsFromId } from "@/lib/Actions/Jobs";

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
