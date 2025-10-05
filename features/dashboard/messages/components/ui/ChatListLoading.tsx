"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function ChatListLoading() {
  return (
    <div className="flex flex-col bg-white dark:bg-gray-900 h-full">
      {/* 🧠 Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded-md" />
          <div className="flex gap-2">
            <Skeleton className="w-8 h-8 rounded-full bg-green-300 dark:bg-green-800" />
            <Skeleton className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700" />
          </div>
        </div>

        {/* 🔍 Search Bar */}
        <div className="relative">
          <Skeleton className="h-10 w-full rounded-md bg-gray-100 dark:bg-gray-800" />
        </div>
      </div>

      {/* 💬 Chat List */}
      <div className="flex-1 overflow-y-auto">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="flex items-center p-3 gap-3 border-b border-gray-100 dark:border-gray-800"
          >
            <Skeleton className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700" />
            <div className="flex-1">
              <Skeleton className="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded-md mb-1" />
              <Skeleton className="h-4 w-20 bg-gray-100 dark:bg-gray-800 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
