"use client";

import { Search, MessageSquare, Edit } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useFriendsAndFollowers } from "../../discover/hooks/useFollow";
import { CachedUser } from "@/types/global";
import { useParams, useRouter } from "next/navigation";
import { getOrCreateChatAction } from "../action";
import { useChatStore } from "../lib/store/chat";
import ChatListLoading from "./ui/ChatListLoading";

interface ChatListProps {
  user: CachedUser;
}

export function ChatList({ user }: ChatListProps) {
  const { data, isLoading } = useFriendsAndFollowers(user?.id || "");
  const { setLoading } = useChatStore();

  const router = useRouter();
  const { id } = useParams();

  if (isLoading)
    return (
      <div>
        <ChatListLoading />
      </div>
    );
  if (!data || !data?.friends?.length) return <div>No mutual friends yet.</div>;

  const mutualFriends = data.friends;

  const handleChatClick = async ({ friendId }: { friendId: string }) => {
    setLoading(true);
    try {
      const chat = await getOrCreateChatAction({
        userId1: user.id,
        userId2: friendId,
      });

      if (chat) {
        router.push(`/dashboard/messages/${chat.id}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="p-4  dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Chats
          </h1>
          <div className="flex gap-2">
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-green-700">
              <MessageSquare className="w-4 h-4 text-white" />
            </div>
            <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600">
              <Edit className="w-4 h-4 text-gray-700 dark:text-gray-200" />
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
          <Input
            placeholder="Search Messenger"
            className="pl-10 bg-gray-50 dark:bg-gray-800 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {mutualFriends.map((friend) => (
          <div
            key={friend.id}
            onClick={() => handleChatClick({ friendId: friend.id })}
            className={`flex items-center p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
              id === friend.id
                ? "bg-green-50 dark:bg-gray-700 border-r-2 border-green-600"
                : ""
            }`}
          >
            <Avatar className="w-12 h-12">
              <AvatarImage
                src={friend.img || "/placeholder.svg"}
                alt="Friend Avatar"
              />
              <AvatarFallback className="bg-green-600 text-white">
                {friend?.name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="ml-3 flex-1 min-w-0">
              <h3 className="text-gray-900 dark:text-gray-100 font-medium truncate">
                {friend.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
