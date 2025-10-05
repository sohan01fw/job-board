"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function PostsLoadingSkeleton({
  count = 5,
}: {
  count?: number;
}) {
  return (
    <div className="space-y-6">
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="p-4 border rounded-lg shadow-sm bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
        >
          {/* Header: avatar + name */}
          <div className="flex items-center gap-3 mb-4">
            <Skeleton className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded-md" />
          </div>

          {/* Post content */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded-md" />
            <Skeleton className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded-md" />
            <Skeleton className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded-md" />
          </div>

          {/* Footer: actions */}
          <div className="flex items-center gap-4 mt-4">
            <Skeleton className="h-6 w-16 rounded-md bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="h-6 w-16 rounded-md bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="h-6 w-16 rounded-md bg-gray-200 dark:bg-gray-700" />
          </div>
        </div>
      ))}

      {/* Load more placeholder */}
      <div className="h-10 flex justify-center items-center">
        <Skeleton className="h-4 w-32 rounded-md bg-gray-200 dark:bg-gray-700" />
      </div>
    </div>
  );
}
