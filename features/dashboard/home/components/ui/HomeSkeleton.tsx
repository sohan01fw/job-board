import { Skeleton } from "@/components/ui/skeleton";
import StatsGridSkeleton from "./StatGridSkeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomeSkeleton() {
  return (
    <div className="space-y-6 m-5">
      {/* Welcome Section Skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-10 w-64 md:w-80" />
        <Skeleton className="h-6 w-48 md:w-60" />
      </div>

      {/* Stats Grid Skeleton */}
      <StatsGridSkeleton />

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activity Skeleton */}
        <Card className="h-[400px]">
          <CardHeader>
            <CardTitle><Skeleton className="h-6 w-32" /></CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center space-x-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-3 w-2/3" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recommended Jobs Skeleton */}
        <Card className="h-[400px]">
          <CardHeader>
             <CardTitle><Skeleton className="h-6 w-40" /></CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-2 border p-3 rounded-lg">
                <div className="flex justify-between">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-5 w-16" />
                </div>
                <Skeleton className="h-4 w-24" />
                <div className="flex gap-2">
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-4 w-12" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-20 rounded-xl" />
        ))}
      </div>
    </div>
  );
}
