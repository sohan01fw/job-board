"use server";

import { google } from "@ai-sdk/google";
import { User } from "@prisma/client";
import { prisma } from "@/lib/Prisma";

// Initialize embedding model
const embeddingModel = google.textEmbedding("gemini-embedding-001");

export async function embedUserProfile({
  userId,
  userData,
}: {
  userId: string;
  userData: User;
}) {
  // 1. Convert user data JSON object into a descriptive string
  const profileText = `
    Job Title: ${userData.title ?? "Not specified"}.
    Bio: ${userData.bio ?? "Not specified"}.
    Skills: ${userData.skills.join(", ")}.
    Experience Level: ${userData.experience ?? "Not specified"}.
    Current Status: ${userData.status}.
    Location: ${userData.location ?? "Not specified"}.
    Education: ${userData.education ?? "Not specified"}.
    Seeking Job Types: ${userData.jobType.join(", ")}.
  `
    .trim()
    .replace(/\s+/g, " "); // Clean up whitespace for the model

  // 2. Generate embedding from the combined string
  const { embeddings } = await embeddingModel.doEmbed({
    values: [profileText],
  });
  const vector = embeddings[0]; // array of numbers

  // 3. Store embedding in Supabase
  const data = await prisma.user.update({
    where: { id: userId },
    data: { embedding: vector },
  });

  if (!data) {
    console.error("Error updating user embedding:");
  }
  console.log(`Successfully embedded profile for user: ${userId}`);
}
