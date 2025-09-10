"use server";

import { google } from "@ai-sdk/google";
import { prisma } from "@/lib/Prisma";
import { JobData } from "@/features/dashboard/types";

// Initialize embedding model
const embeddingModel = google.textEmbedding("gemini-embedding-001");

export async function embedJobProfile({
  jobId,
  jobData,
}: {
  jobId: string;
  jobData: JobData;
}) {
  // 1️⃣ Convert job data to descriptive string
  const jobText = `
    Job Title: ${jobData.title}.
    Company: ${jobData.company}.
    Location: ${jobData.location}.
    Work Type: ${jobData.workType}.
    Job Type: ${jobData.jobType}.
    Experience Level: ${jobData.experience}.
    Salary: ${jobData.minSalary} - ${jobData.maxSalary} ${jobData.currency}.
    Description: ${jobData.description}.
    Requirements: ${jobData.requirements.join(", ")}.
    Benefits: ${jobData.benefits.join(", ")}.
    Skills: ${jobData.skills.join(", ")}.
    Application Deadline: ${jobData.applicationDeadline}.
    Contact Email: ${jobData.contactEmail}.
  `
    .trim()
    .replace(/\s+/g, " ");

  // 2️⃣ Generate embedding
  const { embeddings } = await embeddingModel.doEmbed({
    values: [jobText],
  });
  const vector = embeddings[0];

  // 3️⃣ Store embedding in DB using Prisma
  const updatedJob = await prisma.jobPost.update({
    where: { id: jobId },
    data: { embedding: vector },
  });

  if (!updatedJob) {
    console.error("Error updating job embedding");
  } else {
    console.log(`Successfully embedded job: ${jobId}`);
  }
}
