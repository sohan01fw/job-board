import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="m-5">
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6 md:p-12 flex flex-col items-center gap-6 animate-pulse">
        {/* Profile Image & Basic Info */}
        <div className="flex flex-col md:flex-row items-center md:items-start w-full max-w-5xl gap-8">
          <Skeleton className="w-44 h-44 rounded-full" />

          <div className="flex-1 flex flex-col gap-3">
            <Skeleton className="w-64 h-8 rounded-md" />
            <Skeleton className="w-48 h-6 rounded-md" />
            <Skeleton className="w-32 h-5 rounded-md" />
            <Skeleton className="w-40 h-4 rounded-md" />
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-8 w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <Skeleton className="w-32 h-6 rounded-md" />
            <Skeleton className="w-48 h-4 rounded-md" />
            <Skeleton className="w-40 h-4 rounded-md" />
          </div>

          <div className="flex flex-col gap-2">
            <Skeleton className="w-32 h-6 rounded-md" />
            <Skeleton className="w-48 h-4 rounded-md" />
            <Skeleton className="w-40 h-4 rounded-md" />
            <Skeleton className="w-36 h-4 rounded-md" />
          </div>
        </div>

        {/* Skills */}
        <div className="mt-8 w-full max-w-5xl">
          <Skeleton className="w-32 h-6 rounded-md mb-3" />
          <div className="flex flex-wrap gap-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="w-20 h-6 rounded-full" />
            ))}
          </div>
        </div>

        {/* Bio */}
        <div className="mt-8 w-full max-w-5xl">
          <Skeleton className="w-32 h-6 rounded-md mb-2" />
          <Skeleton className="w-full h-4 rounded-md mb-2" />
          <Skeleton className="w-full h-4 rounded-md mb-2" />
          <Skeleton className="w-3/4 h-4 rounded-md" />
        </div>

        {/* Links */}
        <div className="mt-8 w-full max-w-5xl flex flex-wrap gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="w-24 h-6 rounded-md" />
          ))}
        </div>
      </div>
    </div>
  );
}
