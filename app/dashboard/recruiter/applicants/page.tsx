import Applicants from "@/features/dashboard/recruiter/components/applicants/Applicants";

export default async function ApplicantsPage({
  searchParams,
}: {
  // Next 15: searchParams is a Promise
  searchParams: Promise<{ job_id?: string | string[] }>;
}) {
  const { job_id } = await searchParams;
  const jobId = Array.isArray(job_id) ? job_id[0] : (job_id ?? "");

  return (
    <div className="p-4">
      {/*{applicants.map((app) => {
        return <Applicants applicants={app} key={app.id} />;
      })}*/}
      <Applicants jobId={jobId} />
    </div>
  );
}
