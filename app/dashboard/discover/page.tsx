// app/dashboard/discover/page.tsx
import { CreatePost } from "@/features/dashboard/discover/components/CreatePost";
import { PostList } from "@/features/dashboard/discover/components/DiscoverFeed";
import { SuggestedConnections } from "@/features/dashboard/discover/components/SuggestedConnection";
import { getCachedUser } from "@/lib/redis";

export default async function Discover() {
  const user = await getCachedUser();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Main Feed */}
      <div className="lg:col-span-3 space-y-6">
        <CreatePost userData={user} />
        <PostList userData={user} />
      </div>

      {/* Sidebar */}
      <div className="lg:col-span-1 sticky no-scrollbar h-screen overflow-y-auto">
        <SuggestedConnections currentUser={user} />
      </div>
    </div>
  );
}
