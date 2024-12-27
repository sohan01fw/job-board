import { Jobcard } from "@/components/sharedcomponents/Jobs/Jobcard";
import { Jobcatagory } from "@/components/sharedcomponents/Jobs/Jobcatagory";
import { Button } from "@/components/ui/button";
import { GetAllJobs } from "@/lib/Actions/Jobs";
import Link from "next/link";

export default async function Jobs() {
  const Jobs = await GetAllJobs();
  return (
    <div className="border border-black w-[50vw]">
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
        <div className="border border-black p-3">
          {Jobs.data?.map((data) => {
            return <Jobcard key={data.id} data={data} />;
          })}
        </div>
      </div>
    </div>
  );
}
