"use server";

import { prisma } from "@/lib/Prisma";
import { redis } from "@/lib/redis";
import { withTryCatch } from "@/lib/tryCatch";
import { CachedUser } from "@/types/global";
import { User } from "@prisma/client";

// server/actions/user.ts
export async function UpdateUserProfile({
  email,
  data,
}: {
  email: string;
  data: Partial<Omit<User, "id" | "email">>; // any user fields except id/email
}) {
  return withTryCatch(async () => {
    // 1️⃣ Update DB
    const updated = await prisma.user.update({
      where: { email },
      data,
    });

    // 2️⃣ Update Redis cache (only CachedUser fields)
    const cacheKey = `user:${updated.id}`;

    const cachedRaw: string | null = await redis.get(cacheKey);
    let cached: CachedUser | null = null;
    if (cachedRaw) {
      try {
        cached = JSON.parse(cachedRaw) as CachedUser;
      } catch {
        cached = null;
      }
    }

    const merged: CachedUser = {
      ...(cached ?? {}),
      id: updated.id,
      email: updated.email,
      name: updated.name ?? null,
      phone: updated.phone ?? null,
      location: updated.location ?? null,
      img: updated.img ?? null,
      resume: updated.resume ?? null,
    };

    await redis.set(cacheKey, JSON.stringify(merged));

    return updated;
  }, "Error updating user profile");
}
