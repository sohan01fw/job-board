import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="space-y-4">
      {/* Filter & Sort Controls */}
      <div className="flex  flex-col gap-2 animate-pulse">
        <div className="flex items-center gap-4  ">
          <Skeleton className="h-8 w-20 rounded-md" />
          <Skeleton className="h-8 w-20 rounded-md" />
        </div>
        <Skeleton className="h-5 w-16 rounded-md" />
      </div>

      {/* Posted Jobs List */}
      <div className="space-y-4 mt-5 h-[30rem] overflow-auto">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="p-4 rounded-2xl animate-pulse">
            <CardContent className="p-0 space-y-3">
              {/* Header */}
              <div className="flex items-center gap-3">
                <Skeleton className="w-12 h-12 rounded-xl" />
                <div className="space-y-1">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-40" />
                </div>
              </div>

              {/* Job Title */}
              <Skeleton className="h-5 w-48" />

              {/* Badges */}
              <div className="flex gap-2">
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>

              {/* Meta info */}
              <Skeleton className="h-4 w-32 mt-2" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
