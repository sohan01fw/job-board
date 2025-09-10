import { cosineSimilarity, generateText } from "ai";
import { getJobsWithEmbeddings, getUserEmbedding } from "../../lib/query";
import { google } from "@ai-sdk/google";
import { UserData } from "@/types/Forms";

export async function RecommendJobsAI({
  user,
  topN,
}: {
  user: UserData;
  topN: number;
}) {
  const userEmbedding = await getUserEmbedding(user.id);
  const jobs = await getJobsWithEmbeddings();

  // 1. Prefilter: compute similarity locally
  const scoredJobs = jobs.map((job) => ({
    ...job,
    score: cosineSimilarity(userEmbedding, job.embedding),
  }));
  const topCandidates = scoredJobs
    .sort((a, b) => b.score - a.score)
    .slice(0, 20); // keep top 20 for AI rerank

  // 2. Send to Gemini for rerank
  const model = google("gemini-2.0-flash"); // pick model you want
  const { text } = await generateText({
    model,
    prompt: `
  You are a job recommendation engine.
  User profile:
  - Title: ${user.title}
  - Location: ${user.location}
  - Experience: ${user.experience}
  - Education: ${user.education}
  - Skills: ${JSON.stringify(user.skills)}
  - Preferred Job Types: ${JSON.stringify(user.jobType)}
  - Salary Range: ${user.salaryRange}
  - Remote: ${user.remote}
  - Willing to Relocate: ${user.relocate}

  User embedding: ${JSON.stringify(userEmbedding)}

  Jobs: ${JSON.stringify(
    topCandidates.map((j) => ({
      id: j.id,
      title: j.title,
      location: j.location || null,
      jobType: j.jobType || null,
      maxSalary: j.maxSalary || null,
      minSalary: j.minSalary || null,
      workType: j.workType || null,
      skills: j.skills || [],
    })),
  )}


  Rank these jobs based on the best fit for the user, considering both embedding similarity and profile filters.
  Return only a JSON array of job IDs in order.
    `,
    temperature: 0,
  });

  // 3. Parse Gemini output
  // 3. Parse Gemini output safely
  let rankedJobIds = safeParseJSON(text);
  if (rankedJobIds.length === 0) {
    rankedJobIds = topCandidates.map((j) => j.id); // fallback
  }

  // 4. Return ranked jobs
  return rankedJobIds
    .map((id) => topCandidates.find((j) => j.id === id))
    .filter(Boolean)
    .slice(0, topN);
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
