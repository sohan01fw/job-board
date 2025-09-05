"use server";

import { JobData } from "../types";
import {
  CreateJobPost,
  getAllApplicantsByJob,
  getAllJobPosts,
} from "./lib/query";

export async function createJob(job: JobData, email: string) {
  return CreateJobPost(job, email);
}

export async function GetAllPostedJobs({ userId }: { userId?: string }) {
  return await getAllJobPosts({ userId });
}
export async function GetAllApplicants({ jobId }: { jobId: string }) {
  return await getAllApplicantsByJob({ jobId });
}
