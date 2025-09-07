"use server";

import { prisma } from "@/lib/Prisma";

export async function getNotifications(userId: string) {
  return prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
}

export async function markAllNotificationsRead(userId: string) {
  return prisma.notification.updateMany({
    where: { userId, read: false },
    data: { read: true },
  });
}

export async function getNotification(id: string) {
  return await getNotifications(id);
}
export async function markAllNotification(userId: string) {
  return await markAllNotificationsRead(userId);
}
