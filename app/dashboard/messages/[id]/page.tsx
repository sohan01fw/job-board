import { MessagingInterface } from "@/features/dashboard/messages/components/MessagingInterface";
import { getCachedUser } from "@/lib/redis";

export default async function Messages({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // ✅ await it
  const user = await getCachedUser();
  return <MessagingInterface id={id} user={user} />;
}
