"use client";

import { useState } from "react";
import { ChatList } from "./ChatList";
import { MessageThread } from "./MessageThread";
import { UserInfo } from "./UserInfo";

export function MessagingInterface() {
  const [selectedChat, setSelectedChat] = useState("prabhat-nepal");
  const [showUserInfo, setShowUserInfo] = useState(true);

  return (
    <div className="flex h-screen bg-white">
      {/* Chat List Sidebar */}
      <div className="w-80 border-r border-gray-200 flex flex-col">
        <ChatList selectedChat={selectedChat} onSelectChat={setSelectedChat} />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        <MessageThread
          chatId={selectedChat}
          onToggleUserInfo={() => setShowUserInfo(!showUserInfo)}
        />
      </div>

      {/* User Info Sidebar */}
      {showUserInfo && (
        <div className="w-80 border-l border-gray-200">
          <UserInfo />
        </div>
      )}
    </div>
  );
}
