// import { DashboardLayout } from "@/features/dashboard/components/DashboardLayout";
import DashboardHome from "@/features/dashboard/home/components/Home";
import { ensureUserInDB, getCachedUser } from "@/lib/redis";

export default async function page() {
  await ensureUserInDB();
  const user = await getCachedUser();

  return (
    <div>
      <DashboardHome user={user} />
    </div>
  );
}
