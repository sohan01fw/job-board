"use server";

import { prisma } from "@/lib/Prisma";
import { withTryCatch } from "@/lib/tryCatch";

export async function deleteUserAccount({ userId }: { userId: string }) {
  return withTryCatch(async () => {
    // Step 1: get dependent IDs outside the transaction to avoid async issues
    const chatIds = (
      await prisma.chatParticipant.findMany({
        where: { userId },
        select: { chatId: true },
      })
    ).map((p) => p.chatId);

    // Step 2: run all deletes in a single transaction
    await prisma.$transaction([
      prisma.post.deleteMany({ where: { authorId: userId } }),
      prisma.jobPost.deleteMany({ where: { userId } }),
      prisma.follow.deleteMany({
        where: { OR: [{ followerId: userId }, { followingId: userId }] },
      }),
      prisma.notification.deleteMany({ where: { userId } }),
      prisma.messages.deleteMany({ where: { senderId: userId } }),
      prisma.chatParticipant.deleteMany({ where: { userId } }),
      prisma.chat.deleteMany({ where: { id: { in: chatIds } } }),
      prisma.userActivity.deleteMany({ where: { userId } }),
      prisma.user.deleteMany({ where: { id: userId } }),
    ]);

    return { success: true };
  }, "Error while deleting user and related data");
}
