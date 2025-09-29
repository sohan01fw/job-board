import { MessagingInterface } from "@/features/dashboard/messages/components/MessagingInterface";
import { getCachedUser } from "@/lib/redis";

export default async function Messages({ params }: { params: any }) {
  const { id } = params as { id: string };
  const user = await getCachedUser();

  return <MessagingInterface id={id} user={user} />;
}
