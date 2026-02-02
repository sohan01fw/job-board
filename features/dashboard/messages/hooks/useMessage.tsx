import { useQuery } from "@tanstack/react-query";
import { getMessagesActions, getOrCreateChatAction } from "../action";

export function useOrCreateChat({
  userId1,
  userId2,
}: {
  userId1: string;
  userId2: string;
}) {
  return useQuery({
    queryKey: ["orCreateChat", userId1, userId2],
    queryFn: async () => {
      return await getOrCreateChatAction({ userId1, userId2 });
    },
    enabled: !!userId1 && !!userId2,
  });
}

export function useMessages({
  chatId,
  initialData,
}: {
  chatId: string;
  initialData?: any;
}) {
  return useQuery({
    queryKey: ["messages", chatId],
    queryFn: async () => {
      return await getMessagesActions({ chatId });
    },
    enabled: !!chatId,
    initialData,
  });
}
