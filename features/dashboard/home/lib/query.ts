"use server";

import { prisma } from "@/lib/Prisma";
import { withTryCatch } from "@/lib/tryCatch";
import { startOfMonth, addMonths, startOfWeek, addWeeks } from "date-fns";

// Get jobs that the user hasn’t applied for yet
async function getJobsWithEmbeddings({ userId }: { userId: string }) {
  return withTryCatch(async () => {
    return prisma.jobPost.findMany({
      where: {
        jobApplications: {
          none: { userId },
        },
      },
      select: {
        id: true,
        title: true,
        company: true,
        location: true,
        jobType: true,
        workType: true,
        minSalary: true,
        maxSalary: true,
        currency: true,
        skills: true,
        embedding: true,
        createdAt: true,
      },
    });
  }, "Error while fetching jobs with embeddings");
}

// Get user embedding vector
async function getUserEmbedding(userId: string) {
  return withTryCatch(async () => {
    const user = await prisma.$queryRaw<{ embedding: number[] }[]>`
      SELECT embedding FROM "User" WHERE id = ${userId} LIMIT 1
    `;
    return user[0]?.embedding ?? null;
  }, "Error while fetching user embedding");
}

async function getJobStats() {
  return withTryCatch(async () => {
    const now = new Date();

    const startOfThisMonth = startOfMonth(now);
    const startOfNextMonth = addMonths(startOfThisMonth, 1);
    const startOfLastMonth = addMonths(startOfThisMonth, -1);

    const [thisMonth, lastMonth] = await Promise.all([
      prisma.jobPost.count({
        where: { createdAt: { gte: startOfThisMonth, lt: startOfNextMonth } },
      }),
      prisma.jobPost.count({
        where: { createdAt: { gte: startOfLastMonth, lt: startOfThisMonth } },
      }),
    ]);

    const rawChange = ((thisMonth - lastMonth) / (lastMonth || 1)) * 100;
    const change = Math.min(rawChange, 100);
    const trend = change >= 0 ? "up" : "down";

    return { value: thisMonth, change: `${change.toFixed(0)}%`, trend };
  }, "Error while fetching job stats");
}

async function getUserApplicationStats({ userId }: { userId: string }) {
  return withTryCatch(async () => {
    const now = new Date();

    const startOfThisWeek = startOfWeek(now);
    const startOfNextWeek = addWeeks(startOfThisWeek, 1);
    const startOfLastWeek = addWeeks(startOfThisWeek, -1);

    const [thisWeek, lastWeek] = await Promise.all([
      prisma.jobApplication.count({
        where: {
          userId,
          createdAt: { gte: startOfThisWeek, lt: startOfNextWeek },
        },
      }),
      prisma.jobApplication.count({
        where: {
          userId,
          createdAt: { gte: startOfLastWeek, lt: startOfThisWeek },
        },
      }),
    ]);

    const rawChange = ((thisWeek - lastWeek) / (lastWeek || 1)) * 100;
    const change = Math.min(rawChange, 100);
    const trend = change >= 0 ? "up" : "down";

    return { value: thisWeek, change: `${change.toFixed(0)}%`, trend };
  }, "Error while fetching user application stats");
}

async function getAcceptedJobsCount({ userId }: { userId: string }) {
  return withTryCatch(async () => {
    const now = new Date();
    const startOfThisWeek = startOfWeek(now);
    const startOfNextWeek = addWeeks(startOfThisWeek, 1);
    const startOfLastWeek = addWeeks(startOfThisWeek, -1);

    const [thisWeek, lastWeek] = await Promise.all([
      prisma.jobApplication.count({
        where: {
          userId,
          status: "ACCEPTED",
          createdAt: { gte: startOfThisWeek, lt: startOfNextWeek },
        },
      }),
      prisma.jobApplication.count({
        where: {
          userId,
          status: "ACCEPTED",
          createdAt: { gte: startOfLastWeek, lt: startOfThisWeek },
        },
      }),
    ]);

    const rawChange = ((thisWeek - lastWeek) / (lastWeek || 1)) * 100;
    const change = Math.min(rawChange, 100);
    const trend = change >= 0 ? "up" : "down";

    return { value: thisWeek, change: `${change.toFixed(0)}%`, trend };
  }, "Error while fetching accepted jobs count");
}

// actions/getUserActivities.ts
async function getUserActivities({
  userId,
  cursor,
  limit = 7,
}: {
  userId: string;
  cursor?: string; // activity id for pagination
  limit?: number;
}) {
  return withTryCatch(async () => {
    const activities = await prisma.userActivity.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: limit + 1, // fetch one extra to check if next page exists
      ...(cursor && { skip: 1, cursor: { id: cursor } }),
      include: {
        jobApplication: {
          select: {
            job: { select: { title: true, company: true, location: true } },
          },
        },
        follow: {
          include: {
            follower: {
              select: { id: true, name: true, img: true, email: true },
            },
            following: {
              select: { id: true, name: true, img: true, email: true },
            },
          },
        },
      },
    });

    let nextCursor: string | undefined = undefined;
    if (activities.length > limit) {
      const nextItem = activities.pop(); // remove the extra one
      nextCursor = nextItem?.id;
    }

    return {
      activities,
      nextCursor,
    };
  }, "Error while fetching user activities");
}

export async function getProfileViews(userId: string) {
  // Fetch current views
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { views: true, createdAt: true },
  });

  if (!user) return null;

  // Example logic to calculate change %
  // You can store previous views in DB or calculate based on timestamp
  const previousViews = user.views - Math.floor(Math.random() * 100); // placeholder
  const change = user.views - previousViews;
  const trend = change >= 0 ? "up" : "down";
  const percentChange = previousViews
    ? ((change / previousViews) * 100).toFixed(0)
    : "0";

  return {
    value: user.views.toLocaleString(), // "1,247"
    change: percentChange,
    trend, // "up" or "down"
  };
}
export {
  getJobsWithEmbeddings,
  getUserEmbedding,
  getJobStats,
  getUserApplicationStats,
  getAcceptedJobsCount,
  getUserActivities,
};
