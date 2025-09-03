"use server";

import { getAllJobs } from "./lib/query";

export async function GetAllJobs({
  sort,
  filter,
}: {
  sort?: string;
  filter?: string[];
}) {
  return await getAllJobs({ sort, filter });
}
