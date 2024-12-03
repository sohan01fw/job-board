import { Jobcard } from "@/components/sharedcomponents/Jobs/Jobcard";
import { Jobcatagory } from "@/components/sharedcomponents/Jobs/Jobcatagory";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Jobs() {
  const nav = useRouter();
  return (
    <div className="border border-black w-[50vw]">
      <div className="flex flex-row justify-between">
        <h1 className=" text-2xl font-bold">Explore Jobs</h1>
        <Button
          onClick={() => {
            nav.push("/dashboard/createjob");
          }}
        >
          Create Jobs
        </Button>
      </div>
      <div className="m-3 flex flex-row gap-10">
        <div>
          <Jobcatagory />
        </div>
        <div className="border border-black p-3">
          <Jobcard />
        </div>
      </div>
    </div>
  );
}
