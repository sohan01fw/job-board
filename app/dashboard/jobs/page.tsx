import { Button } from "@/components/ui/button";
import { JobBoard } from "@/features/dashboard/components/JobBoard";
import { Jobindex } from "@/features/dashboard/jobs/components/Jobindex";
import Link from "next/link";
export default async function Jobs() {
  return (
    <div className="   md:m-5 h-[36.2rem] overflow-hidden">
      {/*<div className="md:w-[60vw] p-5 md:p-10 ">
        <div className="flex flex-col md:flex-row justify-between">
          <h1 className=" text-2xl font-bold">Explore Jobs</h1>
          <Link href={"/dashboard/createjob"}>
            <Button>Create Jobs</Button>
          </Link>
        </div>
        <div className="m-3 flex flex-col md:flex-row gap-10">
          <div></div>
          <div className="p-3 h-[30rem] overflow-y-scroll jobindex">
            <Jobindex showbtn={false} delcard={true} />
          </div>
        </div>
      </div>*/}
      <JobBoard />
    </div>
  );
}
