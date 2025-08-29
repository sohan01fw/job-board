// import { DashboardLayout } from "@/features/dashboard/components/DashboardLayout";
import DashboardHome from "@/features/dashboard/home/components/Home";
import { CreateUser } from "@/features/dashboard/user/profile/actions";
import { authUser, CheckUser } from "@/lib/Actions/Users";

export default async function page() {
  const user = await authUser();
  const isUser = await CheckUser(user.email);
  if (isUser.error) {
    await CreateUser(user);
  }
  return (
    <div>
      {/*<DashboardLayout />*/}
      <DashboardHome />
    </div>
  );
}
