"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function PeopleYouMayKnowLoading({
  count = 3,
}: {
  count?: number;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">
          <Skeleton className="h-5 w-36 bg-gray-200 dark:bg-gray-700 rounded-md" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {[...Array(count)].map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <Skeleton className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700" />
            <div className="flex-1 space-y-1">
              <Skeleton className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded-md" />
              <Skeleton className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded-md" />
            </div>
            <Skeleton className="h-6 w-16 rounded-md bg-gray-200 dark:bg-gray-700" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
