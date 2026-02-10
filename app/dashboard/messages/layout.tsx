import type { Metadata } from "next";
import { getCachedUser } from "@/lib/redis";
import { Suspense } from "react";
import ChatListLoading from "@/features/dashboard/messages/components/ui/ChatListLoading";
import ChatListWrapper from "@/features/dashboard/messages/components/ChatListWrapper";

export const metadata: Metadata = {
  title: "Messages",
};

export default async function MessageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCachedUser();

  return (
    <div className="flex h-[calc(100vh-64px)] bg-white dark:bg-gray-900 overflow-hidden">
      {/* Persistent Chat List Sidebar */}
      <div className="w-80 border-r border-gray-200 dark:border-gray-800 flex flex-col shrink-0 flex-grow-0">
        <Suspense fallback={<ChatListLoading />}>
          <ChatListWrapper user={user} />
        </Suspense>
      </div>
      
      {/* Main Content (Chat or Selection) */}
      <div className="flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  );
}
