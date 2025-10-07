"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Bell } from "lucide-react";
import {
  useMarkAllNotifications,
  useNotificationsRealtime,
  Notification,
} from "./hooks/useGetNotifications";
import { useState, useEffect } from "react";
import Pusher from "pusher-js";
import { BellSkeleton } from "./BellSkeleton";
import { useAudioUnlock } from "@/lib/audio";

export function NotificationsDropdown({ userId }: { userId: string }) {
  const {
    data: notificationsFromQuery = [],
    isLoading,
    error,
  } = useNotificationsRealtime(userId);
  const { mutate: markAllNotifications } = useMarkAllNotifications(userId);
  const [shakeBell, setShakeBell] = useState(false);

  // Initialize state only once

  const [notifications, setNotifications] = useState<Notification[]>(
    () => notificationsFromQuery,
  );

  const [hasUnread, setHasUnread] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!hasUnread) return;
    const interval = setInterval(() => {
      setShakeBell(true);
      setTimeout(() => setShakeBell(false), 500);
    }, 2000);
    return () => clearInterval(interval);
  }, [hasUnread]);

  // Sync query data into local state when query updates

  useEffect(() => {
    if (!notificationsFromQuery) return;

    setNotifications((prev) => {
      // Merge new query items that are not already in local state
      const existingIds = new Set(prev.map((n) => n.id));
      const newItems = notificationsFromQuery.filter(
        (n) => !existingIds.has(n.id),
      );
      if (newItems.length === 0) return prev; // nothing new, avoid state change

      return [...newItems, ...prev]; // merge
    });
  }, [notificationsFromQuery]);

  // Update unread dot
  useEffect(() => {
    if (notifications?.length) {
      setHasUnread(notifications.some((n) => !n.read));
    }
  }, [notifications]);

  const handleOpen = () => {
    setIsOpen(true);
    setHasUnread(false);

    // mark as read in DB
    markAllNotifications();

    // mark all read locally
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleClose = () => setIsOpen(false);

  useAudioUnlock();
  // Realtime Pusher updates
  useEffect(() => {
    if (!userId) return;

    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
      authEndpoint: "/api/pusher/auth",
    });

    const channel = pusher.subscribe(`private-job-notification-${userId}`);

    channel.bind("job-notification", (jobnotif: any) => {
      setNotifications((prev) => [
        {
          id: Math.random().toString(), // temporary local ID
          userId: userId, // ⚠️ required
          jobApplicationId: null, // optional
          message: jobnotif.message,
          createdAt: jobnotif.createdAt,
          read: false,
        },
        ...prev,
      ]);

      setHasUnread(true);
      new Audio("/nudge.mp3").play().catch(() => {});
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
      pusher.disconnect();
    };
  }, [userId]);

  const getEmoji = (msg: string) => {
    if (msg.includes("ACCEPTED")) return "🎉";
    if (msg.includes("REJECTED")) return "😔";
    if (msg.includes("PENDING")) return "⏳";
    return "📢";
  };

  if (isLoading) return <BellSkeleton />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <DropdownMenu
      open={isOpen}
      onOpenChange={(open) => (open ? handleOpen() : handleClose())}
    >
      <DropdownMenuTrigger asChild>
        <button
          className={`relative p-2 rounded-full transition ${
            shakeBell ? "shake" : ""
          } bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800
             focus:outline-none focus:ring-0 active:ring-0`}
        >
          <Bell className="w-6 h-6 text-gray-700 dark:text-gray-200" />
          {hasUnread && (
            <span className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-72 max-h-80 overflow-y-auto rounded-md shadow-lg p-2 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
        {notifications.length > 0 ? (
          notifications.map((n) => (
            <DropdownMenuItem
              key={n.id}
              className={`flex flex-col items-start px-3 py-2 rounded-md transition ${
                n.read
                  ? "bg-white dark:bg-gray-900"
                  : "bg-blue-50 dark:bg-blue-950/40"
              }`}
            >
              <span className="text-sm flex items-center gap-2 text-gray-800 dark:text-gray-200">
                <span>{getEmoji(n.message)}</span>
                <span>{n.message}</span>
              </span>
              <span className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                {new Date(n.createdAt).toLocaleTimeString()}
              </span>
            </DropdownMenuItem>
          ))
        ) : (
          <DropdownMenuItem className="text-gray-500 dark:text-gray-400 px-3 py-2">
            No notifications
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
