import DashboardHome from "@/features/dashboard/home/components/Home";
import { getCachedUser } from "@/lib/redis";
import { Suspense } from "react";
import HomeSkeleton from "@/features/dashboard/home/components/ui/HomeSkeleton";

export default async function Page() {
  const user = await getCachedUser();

  if (!user) {
    return null; // Should be handled by layout/middleware
  }

  return (
    <Suspense fallback={<HomeSkeleton />}>
      <DashboardHome user={user} />
    </Suspense>
  );
}
