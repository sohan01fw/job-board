"use client";

import { useCallback, useRef } from "react";
// import { useChatStore } from "../lib/store/chat";
import { MessageThread } from "./MessageThread";
import { CachedUser } from "@/types/global";
import { Message } from "../types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { sendMessagesAction } from "../action";
import { EmojiPicker } from "../../discover/components/ui/EmojiPicker";

export function MessagingInterface({
  user,
  id,
  initialMessages,
}: {
  user: CachedUser;
  id: string;
  initialMessages?: any[];
}) {
  // const { loading } = useChatStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<() => void>(() => {}); // passed from thread to scroll down

  const messagesRef = useRef<
    React.Dispatch<React.SetStateAction<Message[]>> | undefined
  >(undefined);

  // Optimistic send
  const handleSendMessage = useCallback(async () => {
    const text = inputRef.current?.value.trim();
    if (!text) return;

    const tempId = `temp-${Date.now()}`;
    const optimisticMessage: Message = {
      id: tempId,
      text,
      user: { id: user.id, name: user.name },
      sender: {
        id: user.id,
        name: user.name,
        img: user.img || "",
      },
      createdAt: new Date().toISOString(),
    };

    // Optimistically add message
    messagesRef.current?.((prev) => [...prev, optimisticMessage]);

    // Clear input
    if (inputRef.current) inputRef.current.value = "";

    // Scroll down
    scrollRef.current?.();

    try {
      await sendMessagesAction({
        userId: user.id,
        chatId: id,
        content: text,
      });
    } catch (err) {
      console.error("Failed to send message:", err);
      // Remove optimistic message on failure
      messagesRef.current?.((prev) => prev.filter((m) => m.id !== tempId));
    }
  }, [id, user]);

  return (
    <div className="flex flex-col w-full h-full bg-gray-50 dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm">
      {/* 💬 Message Thread */}
      <div className="flex-1 overflow-hidden">
        <MessageThread
          chatId={id}
          currentUser={user}
          setMessagesRef={messagesRef}
          scrollRef={scrollRef}
          initialMessages={initialMessages}
        />
      </div>

      {/* ✏️ Input Section */}
      <div className="flex-shrink-0 p-3 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <Input
              ref={inputRef}
              placeholder="Type a message..."
              className="bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 pr-12 rounded-full focus:ring-2 focus:ring-green-500 focus:border-green-500"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <EmojiPicker
                onSelectAction={(emoji: any) => {
                  if (inputRef.current) {
                    inputRef.current.value += emoji.native ?? emoji;
                  }
                }}
              />
            </div>
          </div>

          <Button
            size="sm"
            className="bg-green-600 hover:bg-green-700 text-white rounded-full p-2"
            onClick={handleSendMessage}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
