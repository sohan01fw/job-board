"use server";
import { cosineSimilarity, generateText } from "ai";
import { getJobsWithEmbeddings, getUserEmbedding } from "./query";
import { google } from "@ai-sdk/google";
import { UserData } from "@/types/Forms";

export async function computeJobsRecommendation({
  user,
  topN,
}: {
  user: UserData;
  topN: number;
}) {
  const userEmbedding = await getUserEmbedding(user.id);
  const jobs = await getJobsWithEmbeddings({ userId: user.id });

  // 1. Compute similarity locally
  const scoredJobs = jobs
    .map((job) => {
      const score = cosineSimilarity(userEmbedding, job.embedding);
      return {
        ...job,
        score,
        matchPercent: Math.round(score * 100),
      };
    })
    .filter((j) => j.matchPercent >= 50) // filter out low matches
    .sort((a, b) => b.matchPercent - a.matchPercent); // sort by match %

  if (scoredJobs.length === 0) return []; // no suitable jobs

  // 2. Take top 20 for AI rerank
  const topCandidates = scoredJobs.slice(0, 20);

  // 3. Send to Gemini for rerank
  const model = google("gemini-2.0-flash");
  const { text } = await generateText({
    model,
    prompt: `
You are a job recommendation engine.
User profile:
- Title: ${user.title}
- Description: ${user.description}
- Location: ${user.location}
- Experience: ${user.experience}
- Education: ${user.education}
- Skills: ${JSON.stringify(user.skills)}
- Preferred Job Types: ${JSON.stringify(user.jobType)}
- Salary Range: ${user.salaryRange}
- Requirements: ${JSON.stringify(user.requirements)}
- Benefits: ${JSON.stringify(user.benefits)}
- Remote: ${user.remote}
- Willing to Relocate: ${user.relocate}

User embedding: ${JSON.stringify(userEmbedding)}

Jobs: ${JSON.stringify(
      topCandidates.map((j) => ({
        id: j.id,
        title: j.title,
        description: j.description || null,
        company: j.company,
        createdAt: j.createdAt,
        experience: j.experience || null,
        benifits: j.benefits || [],
        currency: j.currency,
        location: j.location || null,
        jobType: j.jobType || null,
        maxSalary: j.maxSalary || null,
        minSalary: j.minSalary || null,
        workType: j.workType || null,
        skills: j.skills || [],
        matchPercent: j.matchPercent,
      })),
    )}

Rank these jobs based on the best fit for the user, considering both embedding similarity and profile filters.
Return only a JSON array of job IDs in order.
    `,
    temperature: 0,
  });

  // 4. Parse Gemini output safely
  let rankedJobIds = safeParseJSON(text);
  if (!rankedJobIds || rankedJobIds.length === 0) {
    rankedJobIds = topCandidates.map((j) => j.id); // fallback
  }

  // 5. Return final ranked jobs
  const rankedJobs = rankedJobIds
    .map((id) => topCandidates.find((j) => j.id === id))
    .filter(Boolean);

  // 6. If still less than topN, append other scoredJobs
  const remaining = scoredJobs.filter((j) => !rankedJobs.includes(j));
  return [...rankedJobs, ...remaining].slice(0, topN);
}

function safeParseJSON(text: string): string[] {
  try {
    const cleaned = text
      .trim()
      .replace(/^```json/i, "")
      .replace(/^```/, "")
      .replace(/```$/, "")
      .trim();

    return JSON.parse(cleaned);
  } catch {
    return [];
  }
}
