"use server";

import { getUser } from "@/lib/Actions/Users";
import { ApplyJobApplication, getAllJobs } from "./lib/query";

// action.ts
export async function GetAllJobs({
  sort,
  filter,
  search,
  cursor,
  limit,
}: {
  sort?: string;
  filter?: string[];
  search?: string;
  cursor?: string;
  limit: number;
}) {
  const user = await getUser();
  return await getAllJobs({ sort, filter, search, user, cursor, limit });
}

export async function ApplyJob({
  coverLetter,
  jobId,
  userId,
}: {
  coverLetter: string;
  jobId: string;
  userId: string;
}) {
  return await ApplyJobApplication({ coverLetter, jobId, userId });
}
