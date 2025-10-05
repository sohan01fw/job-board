"use client";

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  RefObject,
  Dispatch,
  SetStateAction,
} from "react";
import Pusher from "pusher-js";
import { useMessages } from "../hooks/useMessage";
import Image from "next/image";
import { Message, MessageThreadProps } from "../types";
import ChatLoading from "./ui/ChatLoading";

interface ExtendedProps extends MessageThreadProps {
  setMessagesRef: RefObject<Dispatch<SetStateAction<Message[]>> | undefined>;
  scrollRef: RefObject<() => void>;
}

export function MessageThread({
  chatId,
  currentUser,
  setMessagesRef,
  scrollRef,
}: ExtendedProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const { data: msgData, isLoading: isLoadingMessages } = useMessages({
    chatId,
  });

  // 🔽 Scroll to bottom function
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // expose scroll function to parent
  scrollRef.current = scrollToBottom;
  setMessagesRef.current = setMessages;

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // 🔄 Subscribe to realtime updates
  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
      authEndpoint: "/api/pusher/auth",
    });

    const channel = pusher.subscribe(`private-chat-${chatId}`);
    channel.bind("new-message", (message: Message) => {
      setMessages((prev) => {
        if (prev.some((m) => m.id === message.id)) return prev;
        return [...prev.filter((m) => !m.id.startsWith("temp-")), message];
      });
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
      pusher.disconnect();
    };
  }, [chatId]);

  // 🧩 Initial load
  useEffect(() => {
    if (msgData) {
      const mappedMessages: Message[] = msgData.map((msg) => ({
        id: msg.id,
        text: msg.content,
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

  if (isLoadingMessages)
    return (
      <div>
        <ChatLoading />
      </div>
    );

  return (
    <div className="flex flex-col h-full w-full bg-gray-50 dark:bg-gray-900">
      {/* 🧠 Header */}
      <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Chat
        </h2>
      </div>

      {/* 💬 Scrollable Messages */}
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
              {!isSelf && msg.sender?.img && (
                <Image
                  src={msg.sender.img}
                  alt={msg?.sender?.name ?? "Unknown"}
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
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
