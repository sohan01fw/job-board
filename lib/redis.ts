import { Redis } from "@upstash/redis";
import { authUser, CheckUser } from "./Actions/Users";
import { pickUser } from "./pickUser";
import { CachedUser } from "@/types/global";
import { createUser } from "@/features/dashboard/home/lib/createUser";

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Read-only cache
export async function getOrInitUserCache(): Promise<CachedUser | null> {
  const User = await authUser();
  const cacheKey = `user:${User.id}`;

  const cached = await redis.get<CachedUser>(cacheKey);
  return cached || null;
}

// Initialize cache + DB if missing
export async function initUserCache(): Promise<CachedUser> {
  const User = await authUser();
  const cacheKey = `user:${User.id}`;

  // Remove any existing cache
  await redis.del(cacheKey);

  // Check DB
  let dbUser = await CheckUser(User.email);

  // If not in DB, create
  if (!dbUser) {
    try {
      await createUser(User);
      dbUser = await CheckUser(User.email);
      if (!dbUser) throw new Error("Failed to insert user into DB");
    } catch (err) {
      console.error("Create user error:", err);
      throw err;
    }
  }

  // Prepare cacheable object
  const userToCache = pickUser(dbUser);

  // Save to Redis
  await redis.set(cacheKey, userToCache);

  return userToCache;
}

import { cache } from "react";

// Combined function
export const getCachedUser = cache(async (): Promise<CachedUser> => {
  const cached = await getOrInitUserCache();
  if (cached) return cached;

  // If not in cache, initialize
  return await initUserCache();
});

export async function ensureUserInDB() {
  const User = await authUser();

  let dbUser = await CheckUser(User.email);

  if (!dbUser) {
    try {
      await createUser(User);
      dbUser = await CheckUser(User.email);
      if (!dbUser) throw new Error("Failed to insert user into DB");
    } catch (err) {
      console.error("Create user error:", err);
      throw err;
    }
  }
}

export async function withRedisCache<T>(
  key: string,
  fetcher: () => Promise<T>,
  ex: number = 300 // default 5 minutes
): Promise<T> {
  try {
    const cached = await redis.get<T>(key);
    if (cached) {
      // Upstash Redis might return the object directly or as a string depending on how it was set
      return typeof cached === "string" ? JSON.parse(cached) : cached;
    }

    const fresh = await fetcher();
    if (fresh !== undefined && fresh !== null) {
      await redis.set(key, JSON.stringify(fresh), { ex });
    }
    return fresh;
  } catch (error) {
    console.error(`Redis cache error for key ${key}:`, error);
    return fetcher(); // Fallback to fresh data on error
  }
}
