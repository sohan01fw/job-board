import { Jobcatagory } from "@/components/sharedcomponents/Jobs/Jobcatagory";
import { Jobindex } from "@/components/sharedcomponents/Jobs/Jobindex";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default async function Jobs() {
  return (
    <div className=" flex justify-center  m-5 h-screen overflow-hidden">
      <div className="w-[60vw] p-10 ">
        <div className="flex flex-row justify-between">
          <h1 className=" text-2xl font-bold">Explore Jobs</h1>
          <Link href={"/dashboard/createjob"}>
            <Button>Create Jobs</Button>
          </Link>
        </div>
        <div className="m-3 flex flex-row gap-10">
          <div>
            <Jobcatagory />
          </div>
          <div className="p-3 h-[30rem] overflow-y-scroll jobindex">
            <Jobindex showbtn={false} />
          </div>
        </div>
      </div>
    </div>
  );
}
