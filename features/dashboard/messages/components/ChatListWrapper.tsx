import { getFriendsAndFollowersAction } from "@/features/dashboard/discover/action";
import { ChatList } from "./ChatList";
import { CachedUser } from "@/types/global";

export default async function ChatListWrapper({ user }: { user: CachedUser }) {
  const initialData = await getFriendsAndFollowersAction({ userId: user.id });
  return <ChatList user={user} initialData={initialData} />;
}
