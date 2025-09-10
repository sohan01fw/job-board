"use server";

import { prisma } from "@/lib/Prisma";

async function getJobsWithEmbeddings() {
  return await prisma.$queryRaw<
    {
      id: string;
      title: string;
      location: string;
      jobType: string;
      workType: string;
      minSalary: number;
      maxSalary: number;
      currency: string;
      skills: string[];
      embedding: number[];
    }[]
  >`
    SELECT
      id,
      title,
      "location",
      "jobType",
      "workType",
      "minSalary",
      "maxSalary",
      "currency",
      "skills",
      embedding
    FROM "JobPost"
  `;
}

async function getUserEmbedding(userId: string) {
  const user = await prisma.$queryRaw<{ embedding: number[] }[]>`
    SELECT embedding FROM "User" WHERE id = ${userId} LIMIT 1
  `;
  return user[0].embedding;
}
export { getJobsWithEmbeddings, getUserEmbedding };
