"use server";
import { getJobsWithEmbeddings, getUserEmbedding } from "./lib/query";

export const getJobsWithEmbeds = async () => {
  const jobs = await getJobsWithEmbeddings();
  return jobs;
};

export const getUserEmbeds = async (userId: string) => {
  const user = await getUserEmbedding(userId);
  return user;
};
