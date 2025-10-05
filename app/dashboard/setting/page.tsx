import DeleteAccount from "@/features/dashboard/setting/components/DeleteAccount";
import { getCachedUser } from "@/lib/redis";

export default async function SettingPage() {
  const user = await getCachedUser();
  return (
    <div className="m-5">
      <DeleteAccount userId={user?.id} />
    </div>
  );
}
