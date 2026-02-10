import { MessagingInterface } from "@/features/dashboard/messages/components/MessagingInterface";
import { getMessagesActions } from "@/features/dashboard/messages/action";
import { getCachedUser } from "@/lib/redis";
import { Suspense } from "react";
import ChatLoading from "@/features/dashboard/messages/components/ui/ChatLoading";

async function MessageInterfaceWrapper({ id, user }: { id: string, user: any }) {
  // Fetch initial messages on the server
  const initialMessages = await getMessagesActions({ chatId: id });
  return <MessagingInterface id={id} user={user} initialMessages={initialMessages} />;
}

export default async function Messages({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getCachedUser();

  return (
    <Suspense fallback={<ChatLoading />}>
       <MessageInterfaceWrapper id={id} user={user} />
    </Suspense>
  );
}
