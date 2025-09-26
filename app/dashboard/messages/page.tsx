import { ChatList } from "@/features/dashboard/messages/components/ChatList";
import { getCachedUser } from "@/lib/redis";

export default async function MessagesPage() {
  const user = await getCachedUser();
  // return <MessagingInterface user={user} />;
  return (
    <div className="ml-1.5 flex h-[90vh] border border-gray-200 bg-white dark:bg-gray-900">
      {/* Chat List Sidebar */}
      <div className="w-80 border-r border-gray-200 dark:border-gray-800 flex flex-col">
        <ChatList user={user} />
      </div>
    </div>
  );
}
