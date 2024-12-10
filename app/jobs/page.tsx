import { Joblist } from "@/components/pages/jobs/Joblist";
import { GetAllJobs } from "@/lib/Actions/Jobs";
export const dynamic = "force-dynamic";
export default async function Jobs() {
  const Jobs = await GetAllJobs();
  return (
    <div>
      <div className="m-10">
        <h1 className="text-4xl font-bold ">Welcome,Applicant</h1>
        <p className="text-sm text-gray-500 font-semibold m-1">
          view latest jobs
        </p>
      </div>
      <div className="flex justify-center">
        <div className="flex flex-col justify-center">
          <div className="">
            <h1 className="text-2xl font-bold"> Explore Jobs </h1>
          </div>
          <div className="border border-black w-full  mt-10">
            {Jobs.data?.map((data) => {
              return <Joblist key={data.id} data={data} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
