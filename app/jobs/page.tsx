import { JobCategory } from "@/features/jobs/components/Jobcatagory";
import { Jobindex } from "@/features/jobs/components/Jobindex";

export const dynamic = "force-dynamic";

export default async function Jobs() {
  return (
    <div className="m-5 mt-[-16]">
      <div className="flex flex-col justify-center">
        <div className=" flex flex-col gap-10">
          <div>
            <JobCategory />
          </div>
          <div>
            <Jobindex showbtn={true} delcard={false} />
          </div>
        </div>
      </div>
    </div>
  );
}
