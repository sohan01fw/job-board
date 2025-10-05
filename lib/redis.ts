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

// Combined function
export async function getCachedUser(): Promise<CachedUser> {
  const cached = await getOrInitUserCache();
  if (cached) return cached;

  // If not in cache, initialize
  return await initUserCache();
}

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
