import { ApplyJobForm } from "@/components/pages/jobs/ApplyjobForm";

export default async function page({
  params,
}: {
  params: Promise<{ jobappid: string }>;
}) {
  const id = (await params).jobappid;
  return (
    <div className="w-full m-10 flex justify-center">
      <ApplyJobForm jobAppId={id} />
    </div>
  );
}
