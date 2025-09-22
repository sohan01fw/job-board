import MyFollowing from "@/features/dashboard/discover/components/MyFollowing";
import { getCachedUser } from "@/lib/redis";

export default async function Following() {
  const currentUser = await getCachedUser();
  return (
    <div className="m-5 mt-10">
      <MyFollowing currentUser={currentUser} />
    </div>
  );
}
