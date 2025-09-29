"use server";

import { ApplicationStatus } from "@prisma/client";
import { JobData } from "../types";
import {
  CreateJobPost,
  getAllApplicantsByJob,
  getAllJobPosts,
  getPostedJobById,
  updateJobApplicationStatus,
} from "./lib/query";

export async function createJob(job: JobData, email: string) {
  return CreateJobPost(job, email);
}
export async function getPostedJobByIdAction({
  jobId,
  userId,
}: {
  jobId: string;
  userId: string;
}) {
  return await getPostedJobById({ jobId, userId });
}
export async function GetAllPostedJobs({
  userId,
  sort,
  filter,
}: {
  sort?: string;
  filter?: string;
  userId?: string;
}) {
  return await getAllJobPosts({ userId, sort, filter });
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
