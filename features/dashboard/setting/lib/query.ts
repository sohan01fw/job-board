"use server";

import { prisma } from "@/lib/Prisma";
import { withTryCatch } from "@/lib/tryCatch";

export async function deleteUserAccount({ userId }: { userId: string }) {
  return withTryCatch(async () => {
    await prisma.$transaction(async (tx) => {
      // Delete dependent relations first (adjust these to match your schema)
      await tx.post.deleteMany({ where: { authorId: userId } });
      await tx.jobPost.deleteMany({ where: { userId: userId } });
      await tx.follow.deleteMany({
        where: { OR: [{ followerId: userId }, { followingId: userId }] },
      });
      await tx.notification.deleteMany({ where: { userId } });
      await tx.messages.deleteMany({ where: { senderId: userId } });
      await tx.chatParticipant.deleteMany({ where: { userId } });
      await tx.chat.deleteMany({
        where: {
          id: {
            in: await tx.chatParticipant
              .findMany({ where: { userId }, select: { chatId: true } })
              .then((res) => res.map((p) => p.chatId)),
          },
        },
      });
      await tx.userActivity.deleteMany({ where: { userId } });

      // Finally delete the user
      const userExists = await tx.user.findUnique({ where: { id: userId } });
      if (userExists) {
        await tx.user.delete({ where: { id: userId } });
      }
    });

    return { success: true };
  }, "Error while deleting user and related data");
}
