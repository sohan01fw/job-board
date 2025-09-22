"use client";

import { Search, MessageSquare, Edit } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface ChatListProps {
  selectedChat: string;
  onSelectChat: (chatId: string) => void;
}

const chats = [
  {
    id: "gen-z",
    name: "Gen Z",
    lastMessage: "Manish: Goal haneko mi...",
    time: "5h",
    avatar: "/professional-woman.png",
    online: true,
    unread: 0,
  },
  {
    id: "prabhat-nepal",
    name: "Prabhat Nepal",
    lastMessage: "Ok",
    time: "4d",
    avatar: "/professional-man.png",
    online: false,
    unread: 0,
  },
  {
    id: "aayush-luitel",
    name: "Aayush Luitel",
    lastMessage: "🔴 1w",
    time: "1w",
    avatar: "/professional-headshot.png",
    online: true,
    unread: 0,
  },
  {
    id: "devraj",
    name: "Devraj",
    lastMessage: "You missed an audio cal...",
    time: "1w",
    avatar: "/professional-woman.png",
    online: false,
    unread: 1,
  },
  {
    id: "backbencher",
    name: "BACKBENCHER...",
    lastMessage: "You: 🙌",
    time: "2w",
    avatar: "/professional-man.png",
    online: false,
    unread: 0,
  },
  {
    id: "csit-76",
    name: "CSIT 76 (Formal Group)",
    lastMessage: "Bikesh: Jun vaye ni gara",
    time: "6w",
    avatar: "/professional-headshot.png",
    online: true,
    unread: 0,
  },
  {
    id: "prabin-rijal",
    name: "Prabin Rijal",
    lastMessage: "You: eh eh",
    time: "9w",
    avatar: "/professional-woman.png",
    online: false,
    unread: 0,
  },
];

export function ChatList({ selectedChat, onSelectChat }: ChatListProps) {
  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold text-gray-900">Chats</h1>
          <div className="flex gap-2">
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-green-700">
              <MessageSquare className="w-4 h-4 text-white" />
            </div>
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-300">
              <Edit className="w-4 h-4 text-gray-700" />
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search Messenger"
            className="pl-10 bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500"
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            className={`flex items-center p-3 cursor-pointer hover:bg-gray-50 transition-colors ${
              selectedChat === chat.id
                ? "bg-green-50 border-r-2 border-green-600"
                : ""
            }`}
          >
            <div className="relative">
              <Avatar className="w-12 h-12">
                <AvatarImage
                  src={chat.avatar || "/placeholder.svg"}
                  alt={chat.name}
                />
                <AvatarFallback className="bg-green-600 text-white">
                  {chat.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              {chat.online && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
              )}
            </div>

            <div className="ml-3 flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="text-gray-900 font-medium truncate">
                  {chat.name}
                </h3>
                <span className="text-xs text-gray-500">{chat.time}</span>
              </div>
              <p className="text-sm text-gray-600 truncate">
                {chat.lastMessage}
              </p>
            </div>

            {chat.unread > 0 && (
              <Badge className="bg-red-500 text-white ml-2">
                {chat.unread}
              </Badge>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
