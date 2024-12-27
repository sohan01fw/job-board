"use client";

import { GetAllJobs } from "@/lib/Actions/Jobs";
import { useCatagoryStore } from "@/lib/Stores/CatagoryStore";
import { useEffect, useState } from "react";
import { Jobcard } from "./Jobcard";

export function Jobindex() {
  const [Jobs, setJobs] = useState<object>();
  const { category } = useCatagoryStore();

  const getAlljobsData = async () => {
    const JobRes = await GetAllJobs(category);
    setJobs(JobRes);
  };
  useEffect(() => {
    getAlljobsData();
  }, [category]);

  return (
    <div>
      {/* @ts-ignore */}
      {Jobs?.data.map((data) => {
        return <Jobcard key={data.id} data={data} />;
      })}
    </div>
  );
}
