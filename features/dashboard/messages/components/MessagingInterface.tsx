"use client";

import { useChatStore } from "../lib/store/chat";
import { MessageThread } from "./MessageThread";
import { CachedUser } from "@/types/global";

export function MessagingInterface({
  user,
  id,
}: {
  user: CachedUser;
  id: string;
}) {
  const { loading } = useChatStore();
  if (loading) return <div>Loading...</div>;
  return (
    <div className="flex flex-col w-[90vw] h-[80vh] lg:h-[90vh] lg:w-[67vw] bg-gray-50 dark:bg-gray-900">
      {/* Full-width, full-height Chat Area */}
      <div className="flex-1">
        <MessageThread chatId={id} currentUser={user} />
      </div>
    </div>
  );
}
