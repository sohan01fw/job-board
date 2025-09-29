import MyMutualFriends from "@/features/dashboard/discover/components/friends/MyMutualFriends";
import { getCachedUser } from "@/lib/redis";

export default async function MutualFriends() {
  const currentUser = await getCachedUser();
  return (
    <div className="mt-10 m-5">
      <MyMutualFriends currentUser={currentUser} />
    </div>
  );
}
