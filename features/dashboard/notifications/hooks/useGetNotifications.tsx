"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase/supabase_client";
import { getNotification, markAllNotification } from "../query";
import { toast } from "sonner";

export type Notification = {
  id: string;
  userId: string;
  jobApplicationId?: string;
  message: string;
  read: boolean;
  createdAt: string;
};

export function useNotificationsRealtime(userId: string) {
  const queryClient = useQueryClient();

  const query = useQuery<any[], Error>({
    queryKey: ["notification", userId],
    queryFn: async () => await getNotification(userId),
  });

  useEffect(() => {
    const setupChannel = async () => {
      const channel = supabase
        .channel(`notifications-user-${userId}`)
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: '"Notification"',
            filter: `"userId"=eq.${userId}`,
          },
          (payload) => {
            queryClient.setQueryData<any[]>(["notification", userId], (old) => [
              payload.new,
              ...(old || []),
            ]);
          },
        )
        .subscribe();

      // Cleanup
      return () => supabase.removeChannel(channel);
    };

    const cleanupPromise = setupChannel();

    return () => {
      cleanupPromise.then((cleanup) => cleanup && cleanup());
    };
  }, [userId, queryClient]);

  return query;
}

export function useMarkAllNotifications(userId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => markAllNotification(userId),
    onSuccess: (response) => {
      // Update the React Query cache immediately
      queryClient.setQueryData(["notification", userId], (old: any[] = []) =>
        old.map((n) => ({ ...n, read: true })),
      );
      return response; // optional, just returns the server response
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to mark notifications as read");
    },
  });
}
