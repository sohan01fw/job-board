"use client";

import { Jobcard } from "./Jobcard";
import { LoadingUi } from "@/lib/LoadingUi";
import JobDetailsPage from "./JobDetails";
import { useJobs } from "../hooks/useJobs";
import { useCatagoryStore } from "../stores/CatagoryStore";

export function Jobindex({
  showbtn,
  delcard,
}: {
  showbtn: boolean;
  delcard: boolean;
}) {
  const { category } = useCatagoryStore();
  const { data: Jobs, error, isLoading } = useJobs(category);

  if (isLoading) return <LoadingUi />;
  if (error) return <div>Error loading jobs</div>;

  if (!Jobs?.data || Jobs.data.length === 0) {
    return (
      <div className="text-center w-[30vw]">
        <h1 className="font-bold text-xl">No Job at the moment... </h1>
      </div>
    );
  }

  return (
    <div className="flex ">
      <div className="p-3 w-[28rem]  h-[30rem] overflow-y-scroll jobindex overflow-x-auto ">
        {Jobs?.data.map((data: any) => {
          return <Jobcard key={data.id} data={data} />;
        })}
      </div>
      {Jobs && Jobs.data.length > 0 ? (
        <JobDetailsPage
          data={Jobs.data[0]}
          showbtn={showbtn}
          delcard={delcard}
        />
      ) : (
        <div>Please select a job to see details</div>
      )}
    </div>
  );
}
