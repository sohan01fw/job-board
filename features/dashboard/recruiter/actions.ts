"use server";

import { ApplicationStatus } from "@prisma/client";
import { JobData } from "../types";
import {
  CreateJobPost,
  getAllApplicantsByJob,
  getAllJobPosts,
  updateJobApplicationStatus,
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
export async function updateJobAppStatus({
  applicationId,
  status,
}: {
  applicationId: string;
  status: ApplicationStatus;
}) {
  return await updateJobApplicationStatus({ applicationId, status });
}
