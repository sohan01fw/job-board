import MyPosts from "@/features/dashboard/discover/components/MyPosts";
import { getCachedUser } from "@/lib/redis";

export default async function DiscoverPosts() {
  const user = await getCachedUser();
  return (
    <div className="m-5">
      <MyPosts userId={user.id} />
    </div>
  );
}
