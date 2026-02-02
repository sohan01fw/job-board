import { MessagingInterface } from "@/features/dashboard/messages/components/MessagingInterface";
import { getMessagesActions } from "@/features/dashboard/messages/action";
import { getCachedUser } from "@/lib/redis";

export default async function Messages({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getCachedUser();

  // Fetch initial messages on the server
  const initialMessages = await getMessagesActions({ chatId: id });

  return (
    <MessagingInterface id={id} user={user} initialMessages={initialMessages} />
  );
}
