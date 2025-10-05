"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function ChatLoading() {
  return (
    <div className="flex flex-col h-full w-full bg-gray-50 dark:bg-gray-900">
      {/* 🧠 Header */}
      <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
        <Skeleton className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded-md" />
      </div>

      {/* 💬 Messages Skeleton */}
      <div className="flex-1 flex flex-col p-4 space-y-4 overflow-y-auto">
        {[...Array(6)].map((_, i) => {
          const isSelf = i % 2 === 0;
          return (
            <div
              key={i}
              className={`flex items-end gap-2 ${
                isSelf ? "justify-end" : "justify-start"
              }`}
            >
              {!isSelf && (
                <Skeleton className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700" />
              )}

              <div
                className={`flex flex-col gap-2 max-w-[75%] sm:max-w-[65%] lg:max-w-[55%] ${
                  isSelf ? "items-end" : "items-start"
                }`}
              >
                <Skeleton
                  className={`h-5 w-[80%] sm:w-[70%] lg:w-[60%] rounded-2xl ${
                    isSelf
                      ? "bg-green-200 dark:bg-green-800"
                      : "bg-gray-200 dark:bg-gray-700"
                  }`}
                />
                <Skeleton
                  className={`h-4 w-12 rounded-md ${
                    isSelf
                      ? "bg-green-100 dark:bg-green-900"
                      : "bg-gray-200 dark:bg-gray-700"
                  }`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
