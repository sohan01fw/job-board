import MyFollowers from "@/features/dashboard/discover/components/friends/MyFollowers";
import { getCachedUser } from "@/lib/redis";

export default async function Followers() {
  const user = await getCachedUser();
  return (
    <div className="mt-10 m-5">
      <MyFollowers currentUser={user} />
    </div>
  );
}
