"use client";

import type React from "react";

import { useState } from "react";
import {
  Phone,
  Video,
  Info,
  Smile,
  Paperclip,
  Send,
  ThumbsUp,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface MessageThreadProps {
  chatId: string;
  onToggleUserInfo: () => void;
}

const messages = [
  {
    id: 1,
    text: "godot with csharp ma ni herdai garxu",
    sender: "other",
    time: "6:41 PM",
    type: "text",
  },
  {
    id: 2,
    text: "ma ta tetikai sakin hola vaneko without prior knowledge hunna raxa",
    sender: "other",
    time: "6:41 PM",
    type: "text",
  },
  {
    id: 3,
    text: "free nai hudo raxa kati kura suprise gara malaai kehi create garera",
    sender: "user",
    time: "6:41 PM",
    type: "text",
  },
  {
    id: 4,
    text: "ma progress ni share gardai garxu kunai kunai timi ni share gardai gara",
    sender: "user",
    time: "7:36 PM",
    type: "text",
  },
  {
    id: 5,
    text: "Ok",
    sender: "other",
    time: "7:36 PM",
    type: "text",
  },
];

export function MessageThread({ onToggleUserInfo }: MessageThreadProps) {
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Handle sending message
      setNewMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center">
          <Avatar className="w-10 h-10">
            <AvatarImage src="/professional-man.png" alt="Prabhat Nepal" />
            <AvatarFallback className="bg-green-600 text-white">
              PN
            </AvatarFallback>
          </Avatar>
          <div className="ml-3">
            <h2 className="text-gray-900 font-semibold">Prabhat Nepal</h2>
            <p className="text-sm text-gray-500">Active 32m ago</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            size="sm"
            variant="ghost"
            className="text-gray-600 hover:bg-gray-100"
          >
            <Phone className="w-5 h-5" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="text-gray-600 hover:bg-gray-100"
          >
            <Video className="w-5 h-5" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="text-gray-600 hover:bg-gray-100"
            onClick={onToggleUserInfo}
          >
            <Info className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                message.sender === "user"
                  ? "bg-green-600 text-white"
                  : "bg-white text-gray-900 border border-gray-200"
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <p
                className={`text-xs mt-1 ${message.sender === "user" ? "text-green-100" : "text-gray-500"}`}
              >
                {message.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex items-center gap-3">
          <Button
            size="sm"
            variant="ghost"
            className="text-gray-500 hover:text-gray-700"
          >
            <Paperclip className="w-5 h-5" />
          </Button>

          <div className="flex-1 relative">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500 pr-12"
            />
            <Button
              size="sm"
              variant="ghost"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              <Smile className="w-4 h-4" />
            </Button>
          </div>

          {newMessage.trim() ? (
            <Button
              size="sm"
              onClick={handleSendMessage}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Send className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              size="sm"
              variant="ghost"
              className="text-green-600 hover:text-green-700"
            >
              <ThumbsUp className="w-5 h-5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
