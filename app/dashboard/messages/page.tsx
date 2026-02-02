import { ChatList } from "@/features/dashboard/messages/components/ChatList";
import { getFriendsAndFollowersAction } from "@/features/dashboard/discover/action";
import { getCachedUser } from "@/lib/redis";

export default async function MessagesPage() {
  const user = await getCachedUser();

  // Fetch initial data for ChatList on the server
  const initialData = await getFriendsAndFollowersAction({ userId: user.id });

  return (
    <div className="ml-1.5 flex h-[90vh]  bg-white dark:bg-gray-900">
      {/* Chat List Sidebar */}
      <div className="w-80  dark:border-gray-800 flex flex-col">
        <ChatList user={user} initialData={initialData} />
      </div>
    </div>
  );
}
