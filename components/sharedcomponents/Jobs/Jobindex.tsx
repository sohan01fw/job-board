"use client";

import { GetAllJobs } from "@/lib/Actions/Jobs";
import { useCatagoryStore } from "@/lib/Stores/CatagoryStore";
import { useEffect, useState } from "react";
import { Jobcard } from "./Jobcard";
import { LoadingUi } from "@/lib/LoadingUi";
export function Jobindex({ showbtn }: { showbtn: boolean }) {
  const [Jobs, setJobs] = useState<object>();
  const { category } = useCatagoryStore();
  const [loading, setLoading] = useState(false);

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
  return (
    <div className="p-3 h-[30rem] overflow-y-scroll jobindex">
      {/* @ts-ignore */}
      {Jobs?.data.map((data) => {
        return <Jobcard key={data.id} data={data} showbtn />;
      })}
    </div>
  );
}
