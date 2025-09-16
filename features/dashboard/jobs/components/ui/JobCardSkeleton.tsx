import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function JobCardSkeleton() {
  return (
    <Card className="p-4 rounded-2xl animate-pulse mb-5">
      <CardContent className="p-0 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="w-12 h-12 rounded-xl" />
            <div className="space-y-1">
              <Skeleton className="w-24 h-4 rounded" />
              <Skeleton className="w-32 h-3 rounded" />
            </div>
          </div>
          <Skeleton className="w-8 h-8 rounded-full" />
        </div>

        {/* Title */}
        <Skeleton className="w-48 h-5 rounded" />

        {/* Badges */}
        <div className="flex gap-2">
          <Skeleton className="w-16 h-6 rounded-full" />
          <Skeleton className="w-16 h-6 rounded-full" />
          <Skeleton className="w-16 h-6 rounded-full" />
        </div>

        {/* Meta info */}
        <Skeleton className="w-32 h-4 rounded" />

        {/* Description */}
        <Skeleton className="w-full h-12 rounded" />

        {/* Salary */}
        <Skeleton className="w-32 h-4 rounded" />

        {/* Footer */}
        <div className="flex justify-between">
          <Skeleton className="w-8 h-8 rounded-full" />
          <Skeleton className="w-20 h-8 rounded" />
        </div>
      </CardContent>
    </Card>
  );
}
