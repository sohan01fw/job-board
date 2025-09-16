"use server";
import {
  getAcceptedJobsCount,
  getJobStats,
  getJobsWithEmbeddings,
  getUserActivities,
  getUserApplicationStats,
  getUserEmbedding,
} from "./lib/query";

export const getJobsWithEmbeds = async ({ userId }: { userId: string }) => {
  const jobs = await getJobsWithEmbeddings({ userId });
  return jobs;
};

export const getUserEmbeds = async (userId: string) => {
  const user = await getUserEmbedding(userId);
  return user;
};
export const jobStats = async () => {
  const stats = await getJobStats();
  return stats;
};

export const userApplicationStats = async ({ userId }: { userId: string }) => {
  const stats = await getUserApplicationStats({ userId });
  return stats;
};

export const jobApplicantionsCount = async ({ userId }: { userId: string }) => {
  const count = await getAcceptedJobsCount({ userId });
  return count;
};

export const userActivities = async ({ userId }: { userId: string }) => {
  const activities = await getUserActivities({ userId });
  return activities;
};
