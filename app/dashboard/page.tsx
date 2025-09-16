// import { DashboardLayout } from "@/features/dashboard/components/DashboardLayout";

import DashboardHome from "@/features/dashboard/home/components/Home";
import { createUser } from "@/features/dashboard/home/lib/createUser";
import { getUser } from "@/lib/Actions/Users";

export default async function page() {
  const user = await getUser();

  if (!user.id) {
    await createUser(user);
  }

  return (
    <div>
      {/*<DashboardLayout />*/}
      <DashboardHome user={user} />
    </div>
  );
}
