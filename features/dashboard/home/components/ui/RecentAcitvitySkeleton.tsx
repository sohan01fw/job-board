import { Skeleton } from "@/components/ui/skeleton";

export default function RecentActivitySkeleton() {
  return (
    <div className="space-y-4 h-[30rem] overflow-y-auto">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="flex items-start space-x-3 p-3 rounded-lg animate-pulse"
        >
          {/* Icon */}
          <Skeleton className="h-6 w-6 rounded-full flex-shrink-0" />

          {/* Content */}
          <div className="flex-1 min-w-0 space-y-2">
            {/* Title + status */}
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-4 w-16 rounded-full" />
            </div>

            {/* Meta info */}
            <div className="flex gap-2">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-3 w-12" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
