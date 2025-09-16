"use server";

import { prisma } from "./Prisma";
import { withTryCatch } from "./tryCatch";

export async function createUserActivity({
  userId,
  type,
  jobAppId,
  status,
}: {
  userId: string;
  type: "JOB_PENDING" | "JOB_ACCEPTED" | "JOB_REJECTED";
  jobAppId: string;
  status?: string;
}) {
  return withTryCatch(async () => {
    const activity = await prisma.userActivity.create({
      data: {
        userId,
        type,
        jobAppId,
        status,
      },
    });
    return activity;
  }, "Error while creating user activity");
}
