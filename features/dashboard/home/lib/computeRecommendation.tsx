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
  try {
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
      .filter((j) => j.matchPercent >= 40)
      .sort((a, b) => b.matchPercent - a.matchPercent);

    if (scoredJobs.length === 0) return [];

    // 2. Take top 10 for AI rerank (reduced from 20 to save quota)
    const topCandidates = scoredJobs.slice(0, 10);

    // 3. Send to Gemini for rerank
    const model = google("gemini-2.5-flash");
    const { text } = await generateText({
      model,
      prompt: `
Rank 10 jobs for this user profile. Return ONLY a JSON array of job IDs.

User Profile:
- Title: ${user.title}
- Skills: ${user.skills?.slice(0, 10).join(", ")}
- Prefers: ${user.remote ? "Remote" : "On-site/Hybrid"}, ${user.jobType?.join(", ")}

Jobs:
${topCandidates
  .map(
    (j, i) => `
[${i}] ID: ${j.id} | ${j.title} at ${j.company}
- Match: ${j.matchPercent}%
- Skills: ${j.skills?.slice(0, 5).join(", ")}
- Description snippet: ${j.description?.slice(0, 160)}...
`
  )
  .join("\n")}
    `,
      temperature: 0,
    });

    // 4. Parse Gemini output safely
    const rankedJobIds = safeParseJSON(text);
    if (!rankedJobIds || rankedJobIds.length === 0) {
      return scoredJobs.slice(0, topN);
    }

    // 5. Return final ranked jobs
    const rankedJobs = rankedJobIds
      .map((id) => topCandidates.find((j) => j.id === id))
      .filter((j): j is (typeof topCandidates)[0] => !!j);

    const seenIds = new Set(rankedJobs.map((j) => j.id));
    const remaining = scoredJobs.filter((j) => !seenIds.has(j.id));
    
    return [...rankedJobs, ...remaining].slice(0, topN);
  } catch (error) {
    console.error("AI Recommendation Error (Quota/Rate Limit):", error);
    // Fallback to local embedding search
    const userEmbedding = await getUserEmbedding(user.id).catch(() => null);
    if (!userEmbedding) return [];
    const jobs = await getJobsWithEmbeddings({ userId: user.id }).catch(() => []);
    return jobs
      .map((job) => ({
        ...job,
        matchPercent: Math.round(cosineSimilarity(userEmbedding, job.embedding) * 100),
      }))
      .sort((a, b) => b.matchPercent - a.matchPercent)
      .slice(0, topN);
  }
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
