import { createUserActivity } from "../query";

export async function createUserActivities({
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
  return await createUserActivity({
    userId,
    type,
    jobAppId,
    status,
  });
}
