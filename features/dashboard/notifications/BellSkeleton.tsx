import { Skeleton } from "@/components/ui/skeleton";

export function BellSkeleton() {
  return (
    <div className="relative p-2 rounded-full bg-transparent">
      <Skeleton className="w-6 h-6 rounded-full" />
      <Skeleton className="absolute top-0 right-0 w-2 h-2 rounded-full" />
    </div>
  );
}
