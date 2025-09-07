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
} from "./hooks/useGetNotifications";
import { useState, useEffect } from "react";

export function NotificationsDropdown({ userId }: { userId: string }) {
  const {
    data: notifications,
    isLoading,
    error,
  } = useNotificationsRealtime(userId);
  const { mutate: markAllNotifications, isPending: isLoadingRead } =
    useMarkAllNotifications(userId);

  const [hasUnread, setHasUnread] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Update unread state whenever notifications change
  useEffect(() => {
    if (notifications) {
      const unreadExists = notifications.some((n) => !n.read);
      setHasUnread(unreadExists);
    }
  }, [notifications]);

  const handleOpen = async () => {
    setIsOpen(true);
    setHasUnread(false);

    if (markAllNotifications) {
      markAllNotifications();
    }
  };

  const handleClose = () => setIsOpen(false);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <DropdownMenu
      open={isOpen}
      onOpenChange={(open) => (open ? handleOpen() : handleClose())}
    >
      <DropdownMenuTrigger asChild>
        <button className="relative p-2 rounded-full hover:bg-gray-100 transition">
          <Bell className="w-6 h-6 text-gray-700" />
          {hasUnread && !isLoadingRead && (
            <span className="absolute top-0 right-0 w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
          )}
          {isLoadingRead && (
            <span className="absolute top-0 right-0 w-2 h-2 bg-gray-400 rounded-full animate-spin" />
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64 max-h-80 overflow-y-auto bg-white rounded-md shadow-lg p-1">
        {notifications && notifications.length > 0 ? (
          notifications.map((n) => (
            <DropdownMenuItem
              key={n.id}
              className="flex flex-col items-start px-3 py-2 hover:bg-gray-100 rounded-md"
            >
              <span className="text-sm">{n.message}</span>
              <span className="text-xs text-gray-400">
                {new Date(n.createdAt).toLocaleTimeString()}
              </span>
            </DropdownMenuItem>
          ))
        ) : (
          <DropdownMenuItem className="text-gray-500 px-3 py-2">
            No notifications
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
