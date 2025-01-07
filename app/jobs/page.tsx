import { Jobcatagory } from "@/components/sharedcomponents/Jobs/Jobcatagory";
import { Jobindex } from "@/components/sharedcomponents/Jobs/Jobindex";
export const dynamic = "force-dynamic";
export default async function Jobs() {
  return (
    <div>
      <div className="m-10 mt-[-2rem]">
        <p className="text-sm text-gray-500 font-semibold ">view latest jobs</p>
      </div>
      <div className="flex justify-center">
        <div className="flex flex-col justify-center">
          <div className="">
            <h1 className="text-2xl font-bold"> Explore Jobs </h1>
          </div>
          <div className=" flex flex-row gap-10">
            <div>
              <Jobcatagory />
            </div>
            <div>
              <Jobindex showbtn={true} delcard={false} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
