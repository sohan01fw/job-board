"use server";

import { getUser } from "@/lib/Actions/Users";
import { ApplyJobApplication, getAllJobs } from "./lib/query";

export async function GetAllJobs({
  sort,
  filter,
}: {
  sort?: string;
  filter?: string[];
}) {
  const user = await getUser();
  return await getAllJobs({ sort, filter, user });
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
