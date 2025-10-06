"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getNotification, markAllNotification } from "../query";
import { toast } from "sonner";

export type Notification = {
  id: string;
  userId: string;
  jobApplicationId?: string | null;
  message: string;
  read: boolean;
  createdAt: string; // keep as string in UI
};

export function useNotificationsRealtime(userId: string) {
  // Just return the query, no local state
  return useQuery<Notification[], Error>({
    queryKey: ["job-notification", userId],
    queryFn: async () => {
      const res = await getNotification(userId);
      return res.map(
        (n: any): Notification => ({
          ...n,
          createdAt: new Date(n.createdAt).toISOString(),
        }),
      );
    },
  });
}

export function useMarkAllNotifications(userId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => markAllNotification(userId),
    onSuccess: () => {
      queryClient.setQueryData<Notification[]>(
        ["job-notification", userId],
        (old = []) => old.map((n) => ({ ...n, read: true })),
      );
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to mark notifications as read");
    },
  });
}
