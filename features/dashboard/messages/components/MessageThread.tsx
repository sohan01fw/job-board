"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Paperclip, Send, ThumbsUp, Smile } from "lucide-react";
import { CachedUser } from "@/types/global";
import Pusher from "pusher-js";
import { sendMessagesAction } from "../action";
import { useMessages } from "../hooks/useMessage";
import Image from "next/image";

interface MessageThreadProps {
  chatId: string;
  currentUser: CachedUser;
}

interface Message {
  id: string;
  text: string;
  content?: string;
  user: { id: string; name: string };
  sender?: { id: string; name: string; img: string };
  createdAt?: string;
  created_at?: string;
}

export function MessageThread({ chatId, currentUser }: MessageThreadProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const { data: msgData, isLoading: isLoadingMessages } = useMessages({
    chatId,
  });

  const bottomRef = useRef<HTMLDivElement | null>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, msgData]);

  // Subscribe to realtime updates
  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
      authEndpoint: "/api/pusher/auth",
    });

    const channel = pusher.subscribe(`private-chat-${chatId}`);
    channel.bind("new-message", (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
      pusher.disconnect();
    };
  }, [chatId]);

  // Initial load

  useEffect(() => {
    if (msgData) {
      const mappedMessages: Message[] = msgData.map((msg) => ({
        id: msg.id,
        text: msg.content, // Prisma uses `content`
        content: msg.content,
        user: { id: msg.sender.id, name: msg.sender.name ?? "Unknown" },
        sender: {
          id: msg.sender.id,
          name: msg.sender.name ?? "Unknown",
          img: msg.sender.img ?? "",
        },
        createdAt: msg.createdAt.toString(),
      }));

      setMessages(mappedMessages);
    }
  }, [msgData]);

  // Handle send
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    await sendMessagesAction({
      userId: currentUser.id,
      chatId,
      content: newMessage,
    });
    setNewMessage("");
  };

  if (isLoadingMessages) return <div>Loading...</div>;

  return (
    <div className="flex flex-col h-full w-full bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex-shrink-0">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Chat
        </h2>
        <Button
          size="sm"
          variant="outline"
          className="text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600"
        >
          User Info
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 flex flex-col p-4 space-y-3 overflow-y-auto">
        {messages.map((msg) => {
          const isSelf =
            msg.user?.id === currentUser.id ||
            msg.sender?.id === currentUser.id;
          const text = msg.text || msg.content;
          const createdAt = msg.createdAt || msg.created_at;

          return (
            <div
              key={msg.id}
              className={`flex items-end gap-2 ${
                isSelf ? "justify-end" : "justify-start"
              }`}
            >
              {/* Show avatar only if friend */}
              {!isSelf && msg.sender?.img && (
                <Image
                  src={msg.sender.img}
                  alt={msg.sender.name}
                  width={32}
                  height={32}
                  className="rounded-full object-cover border border-gray-300 dark:border-gray-600"
                />
              )}

              <div
                className={`max-w-[75%] sm:max-w-[65%] lg:max-w-[55%] px-4 py-2 rounded-2xl shadow-sm transition-colors duration-200 ${
                  isSelf
                    ? "bg-green-600 text-white rounded-br-none"
                    : "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-bl-none"
                }`}
              >
                <p className="text-sm whitespace-pre-wrap break-words">
                  {text}
                </p>
                <p className="text-xs mt-1 text-gray-500 dark:text-gray-400 text-right">
                  {createdAt &&
                    new Date(createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="flex-shrink-0 p-3 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="flex items-center gap-3">
          <Button size="sm" variant="ghost">
            <Paperclip className="w-5 h-5 text-gray-500 dark:text-gray-300" />
          </Button>

          <div className="flex-1 relative">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 pr-12 rounded-full focus:ring-2 focus:ring-green-500 focus:border-green-500"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <Button
              size="sm"
              variant="ghost"
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              <Smile className="w-5 h-5 text-gray-500 dark:text-gray-300" />
            </Button>
          </div>

          {newMessage.trim() ? (
            <Button
              size="sm"
              className="bg-green-600 hover:bg-green-700 text-white rounded-full p-2"
              onClick={handleSendMessage}
            >
              <Send className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              size="sm"
              variant="ghost"
              className="text-green-600 hover:text-green-700 p-2"
            >
              <ThumbsUp className="w-5 h-5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
