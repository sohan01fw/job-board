// import { DashboardLayout } from "@/features/dashboard/components/DashboardLayout";

import DashboardHome from "@/features/dashboard/home/components/Home";
import { createUser } from "@/features/dashboard/home/lib/createUser";
import { getCachedUser } from "@/lib/redis";

export default async function page() {
  const user = await getCachedUser();

  if (!user.id) {
    await createUser(user);
  }

  return (
    <div>
      <DashboardHome user={user} />
    </div>
  );
}
