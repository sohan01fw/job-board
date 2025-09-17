import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div>
      <div className="space-y-6">
        {/* Grid: Form + Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
          {/* Form Section */}
          <div className="space-y-6 animate-pulse">
            <div className="flex items-center justify-between">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-32" />
            </div>
            <Card className="space-y-4 p-4">
              <Skeleton className="h-4 w-32 mb-2" />
              <Skeleton className="h-10 w-full rounded-md" />
              <Skeleton className="h-4 w-32 mt-4 mb-2" />
              <Skeleton className="h-10 w-full rounded-md" />
              <Skeleton className="h-4 w-24 mt-4 mb-2" />
              <Skeleton className="h-10 w-full rounded-md" />
            </Card>
          </div>

          {/* Preview Section */}
          <div className="space-y-6 animate-pulse">
            <div className="flex items-center justify-between">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-32" />
            </div>
            <Card className="p-4">
              <Skeleton className="h-64 w-full rounded-md" />
            </Card>
          </div>
        </div>

        {/* AI Input + Form */}
        <div className="space-y-4 animate-pulse">
          <Skeleton className="h-10 w-full rounded-md" /> {/* AI Input */}
          <Card className="space-y-6 p-4">
            {/* Basic Information */}
            <CardHeader>
              <CardTitle>
                <Skeleton className="h-5 w-48" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Job Title */}
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-10 w-full rounded-md" />

              {/* Company Name */}
              <Skeleton className="h-4 w-32 mt-4" />
              <Skeleton className="h-10 w-full rounded-md" />
            </CardContent>
          </Card>
        </div>
      </div>
      );
    </div>
  );
}
