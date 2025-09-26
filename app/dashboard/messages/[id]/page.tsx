import { MessagingInterface } from "@/features/dashboard/messages/components/MessagingInterface";
import { getCachedUser } from "@/lib/redis";

export default async function Messages({
  params,
}: {
  params: { id: string | Promise<string> };
}) {
  // Await the id in case it's a promise
  const id = await params.id;
  const user = await getCachedUser();

  return (
    <div>
      <MessagingInterface id={id} user={user} />
    </div>
  );
}
