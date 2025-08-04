import { JobCategory } from "@/components/sharedcomponents/Jobs/Jobcatagory";
import { Jobindex } from "@/components/sharedcomponents/Jobs/Jobindex";
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
