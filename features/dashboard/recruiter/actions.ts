"use server";

import { prisma } from "@/lib/Prisma";
import { withTryCatch } from "@/lib/tryCatch";
import { JobData } from "../types";

export async function CreateJobPost(job: JobData, email: string) {
  return withTryCatch(async () => {
    return prisma.jobPost.create({
      data: {
        ...job,
        user: { connect: { email } },
      },
    });
  }, "Error while creating job post");
}

export async function createJob(job: JobData, email: string) {
  return CreateJobPost(job, email);
}
