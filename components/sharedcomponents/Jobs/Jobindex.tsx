"use client";

import { GetAllJobs } from "@/lib/Actions/Jobs";
import { useCatagoryStore } from "@/lib/Stores/CatagoryStore";
import { useEffect, useState } from "react";
import { Jobcard } from "./Jobcard";
import { LoadingUi } from "@/lib/LoadingUi";
export function Jobindex({
  showbtn,
  delcard,
}: {
  showbtn: boolean;
  delcard: boolean;
}) {
  const [Jobs, setJobs] = useState<object | undefined>(undefined);
  const { category } = useCatagoryStore();
  const [loading, setLoading] = useState(true);

  const getAlljobsData = async () => {
    setLoading(true);
    const JobRes = await GetAllJobs(category);

    setJobs(JobRes);
    setLoading(false);
  };
  useEffect(() => {
    getAlljobsData();
  }, [category]);

  if (loading) {
    return <LoadingUi />;
  }

  /* @ts-expect-error:there might not be the value in jobs.data */
  if (Jobs?.data.length <= 0) {
    return (
      <div className="text-center w-[30vw]">
        <h1 className="font-bold text-xl">No Job at the moment... </h1>
      </div>
    );
  }
  return (
    <div className="p-3  h-[30rem] overflow-y-scroll jobindex overflow-x-auto">
      {/* @ts-expect-error:there might not be the value in jobs.data */}
      {Jobs?.data.map((data) => {
        return (
          <Jobcard
            key={data.id}
            data={data}
            showbtn={showbtn}
            delcard={delcard}
          />
        );
      })}
    </div>
  );
}
