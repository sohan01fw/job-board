"use server";

import { prisma } from "@/lib/Prisma";
import { pusherServer } from "@/lib/pusher";
import { withTryCatch } from "@/lib/tryCatch";

// 1️⃣ Find or create a 1:1 chat
export async function getOrCreateChat({
  userId1,
  userId2,
}: {
  userId1: string;
  userId2: string;
}) {
  // check if a chat already exists with exactly these 2 participants
  const chat = await prisma.chat.findFirst({
    where: {
      participants: {
        every: { userId: { in: [userId1, userId2] } },
        some: { userId: { in: [userId1, userId2] } },
      },
    },
    include: { participants: true },
  });

  if (chat) return chat;

  // create new chat
  return prisma.chat.create({
    data: {
      participants: {
        create: [{ userId: userId1 }, { userId: userId2 }],
      },
    },
    include: { participants: true },
  });
}
export async function sendMessage({
  userId,
  chatId,
  content,
}: {
  userId: string;
  chatId: string;
  content: string;
}) {
  return withTryCatch(async () => {
    if (!userId) throw new Error("Unauthorized");

    const chatExists = await prisma.chat.findUnique({ where: { id: chatId } });
    if (!chatExists) throw new Error("Chat does not exist");
    // save message in DB
    const message = await prisma.messages.create({
      data: {
        chatId,
        senderId: userId,
        content,
      },
      include: {
        sender: true,
      },
    });

    // push realtime event

    await pusherServer.trigger(`private-chat-${chatId}`, "new-message", {
      id: message.id,
      content: message.content,
      sender: {
        id: message.sender.id,
        name: message.sender.name,
        img: message.sender.img,
      },
      createdAt: message.createdAt,
    });

    return message;
  }, "Error while sending message");
}

export async function getMessages({ chatId }: { chatId: string }) {
  return withTryCatch(async () => {
    const messages = await prisma.messages.findMany({
      where: { chatId },
      include: {
        sender: {
          select: { id: true, name: true, img: true },
        },
      },
      orderBy: { createdAt: "asc" }, // oldest → newest
    });

    return messages;
  }, "Error while fetching messages");
}
