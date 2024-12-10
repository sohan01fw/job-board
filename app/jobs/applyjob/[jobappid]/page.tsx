import { ApplyJobForm } from "@/components/pages/jobs/ApplyjobForm";

export default async function page({
  params,
}: {
  params: Promise<{ jobappid: string }>;
}) {
  const id = (await params).jobappid;
  return (
    <div className="w-60 m-10">
      <ApplyJobForm jobAppId={id} />
    </div>
  );
}
