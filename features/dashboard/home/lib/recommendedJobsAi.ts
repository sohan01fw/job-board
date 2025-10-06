"use server";
import { UserData } from "@/types/Forms";
import { redis } from "@/lib/redis"; // <- your redis client
import { computeJobsRecommendation } from "./computeRecommendation";

const CACHE_TTL = 60 * 10; // 10 minutes

export async function RecommendJobsAI({
  user,
  topN,
}: {
  user: UserData;
  topN: number;
}) {
  const cacheKey = `recommendations:${user.id}:${topN}`;
  const cached = await redis.get(cacheKey);

  if (cached) {
    try {
      return typeof cached === "string" ? JSON.parse(cached) : cached;
    } catch {
      return cached; // fallback if parse fails
    }
  }

  // no cache -> compute fresh
  const result = await computeJobsRecommendation({ user, topN });

  if (result.length === 0) return [];
  // save in redis
  await redis.set(cacheKey, JSON.stringify(result), { ex: CACHE_TTL });

  return result;
}
