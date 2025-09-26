"use server";

import { getMessages, getOrCreateChat, sendMessage } from "./lib/query";

export const getOrCreateChatAction = async ({
  userId1,
  userId2,
}: {
  userId1: string;
  userId2: string;
}) => {
  return getOrCreateChat({ userId1, userId2 });
};

export const getMessagesActions = async ({ chatId }: { chatId: string }) => {
  return getMessages({ chatId });
};

export const sendMessagesAction = async ({
  userId,
  chatId,
  content,
}: {
  userId: string;
  chatId: string;
  content: string;
}) => {
  return sendMessage({ userId, chatId, content });
};
