import {
  getUserByIdAction,
  updateProfileViewsAction,
} from "@/features/dashboard/user/profile/actions";
import { UserProfile } from "@/features/dashboard/user/profile/components/UserProfile";

export default async function Page({ params }: { params: any }) {
  const { id } = (await params) as { id: string };
  const user = await getUserByIdAction({ userId: id });
  await updateProfileViewsAction({ userId: id });
  return (
    <div className="m-5">
      <UserProfile user={user} />
    </div>
  );
}
