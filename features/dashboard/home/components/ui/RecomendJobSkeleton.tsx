import { Skeleton } from "@/components/ui/skeleton";

export default function RecommendJobSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="p-4 border rounded-lg animate-pulse">
          <div className="flex items-start justify-between">
            <div className="flex-1 space-y-2">
              {/* Company row */}
              <div className="flex items-center space-x-2">
                <Skeleton className="h-4 w-4 rounded" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>

              {/* Job title */}
              <Skeleton className="h-5 w-40" />

              {/* Meta info */}
              <div className="flex items-center space-x-3">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>

            {/* Apply button */}
            <Skeleton className="h-8 w-16 rounded-md ml-4" />
          </div>
        </div>
      ))}
    </div>
  );
}
