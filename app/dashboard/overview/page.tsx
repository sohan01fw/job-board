import {
  ApplicantCard,
  DataCard,
} from "@/components/sharedcomponents/DataCard";
import { DataChart } from "@/components/sharedcomponents/DataChart";
import {
  TotalApplicantCount,
  TotalJobCount,
} from "@/lib/Actions/AggregateData";

export const dynamic = "force-dynamic";

export default async function Overview() {
  //for jobs
  const allJob = await TotalJobCount();
  if ("error" in allJob) {
    alert(allJob.message);
  }

  const totaljobs = allJob.data.reduce(
    (a: any, c: any) => a + (c?._count?.id || 0),
    0,
  );
  //for applicant
  const allApplicant = await TotalApplicantCount();
  if ("error" in allApplicant) {
    alert(allApplicant.message);
  }
  const totalApplicant = allApplicant.data.reduce(
    (a: any, c: any) => a + (c?._sum.applied || 0),
    0,
  );
  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 ">
        <div>
          <DataCard totalJob={totaljobs} allJob={allJob} />
        </div>
        <div>
          <ApplicantCard
            totalApplicant={totalApplicant}
            allApplicant={allApplicant}
          />
        </div>
      </div>
      <div className="m-5 mt-3">
        <DataChart />
      </div>
    </div>
  );
}
