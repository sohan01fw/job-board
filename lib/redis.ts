import { Redis } from "@upstash/redis";
import { authUser, CheckUser } from "./Actions/Users";
import { pickUser } from "./pickUser";
import { CachedUser } from "@/types/global";
import { UserData } from "@/types/Forms";

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function getCachedUser(): Promise<CachedUser> {
  const User = await authUser();
  const cacheKey = `user:${User.id}`;

  const cached = await redis.get(cacheKey);
  if (cached) return cached as CachedUser;

  const dbUser = await CheckUser(User.email); // only now DB hit
  // remove embedding before caching
  const userToCache = pickUser(dbUser);

  await redis.set(cacheKey, userToCache);
  return userToCache as UserData;
}
