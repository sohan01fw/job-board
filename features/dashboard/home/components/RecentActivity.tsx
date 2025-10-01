"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { getIcon } from "../lib/getAcitvityConfig";
import { useUserActivities } from "../hooks/useUserActivites";
import RecentActivitySkeleton from "./ui/RecentAcitvitySkeleton";
import { CachedUser } from "@/types/global";
import Pusher from "pusher-js";
import Image from "next/image";

export function RecentActivity({ user }: { user: CachedUser }) {
  const { data: activities, isLoading, isError } = useUserActivities(user);

  // 🗂 Local state for realtime + initial data
  const [localActivities, setLocalActivities] = useState<any[]>([]);

  // 📥 Sync initial load into local state
  useEffect(() => {
    if (activities) {
      setLocalActivities(activities);
    }
  }, [activities]);

  // 📡 Subscribe to Pusher realtime updates
  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
      authEndpoint: "/api/pusher/auth",
    });

    const channel = pusher.subscribe(`private-follow-${user.id}`);

    const handleEvent = (type: string, data: any) => {
      const newActivity = {
        id: crypto.randomUUID(),
        type,
        title:
          type === "new-follower"
            ? `${data?.friend?.name} started following you`
            : type === "new-following"
              ? `You followed ${data?.friend?.name}`
              : type === "removed-follower"
                ? `${data?.friend?.name} unfollowed you`
                : type === "removed-following"
                  ? `You unfollowed ${data?.friend?.name}`
                  : type === "follow-accepted"
                    ? `${data?.friend?.name} accepted your follow request`
                    : "Activity",
        friend: data.friend || null,
        createdAt: new Date().toISOString(),
      };

      setLocalActivities((prev) => [newActivity, ...prev]);
    };

    channel.bind("new-follower", (data: any) => {
      console.log("🔔 new-follower event received:", data);
      handleEvent("new-follower", data);
    });

    channel.bind("new-following", (data: any) => {
      console.log("➡️ new-following event received:", data);
      handleEvent("new-following", data);
    });

    channel.bind("removed-follower", (data: any) => {
      console.log("❌ removed-follower event received:", data);
      handleEvent("removed-follower", data);
    });

    channel.bind("removed-following", (data: any) => {
      console.log("❌ removed-following event received:", data);
      handleEvent("removed-following", data);
    });

    channel.bind("follow-accepted", (data: any) => {
      console.log("🤝 follow-accepted event received:", data);
      handleEvent("follow-accepted", data);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
      pusher.disconnect();
    };
  }, [user.id]);

  if (isLoading) return <RecentActivitySkeleton />;
  if (isError) return <p>Failed to load activities</p>;

  // console.log(localActivities);
  return (
    <div className="space-y-4 h-[30rem] overflow-y-auto">
      {localActivities.map((a) => (
        <div
          key={a.id}
          className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
        >
          {/* Activity Icon */}
          <div className="flex-shrink-0">{getIcon(a.type)}</div>

          {/* Activity Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-foreground truncate">
                {a.title}
              </p>
              {a.status && (
                <Badge
                  variant="secondary"
                  className="ml-2 flex-shrink-0 text-xs px-2 py-0.5"
                >
                  {a.status}
                </Badge>
              )}
            </div>

            {/* Friend info */}
            {a.friend && (
              <div className="flex items-center gap-2 mt-2">
                <Image
                  src={a.friend.img}
                  alt={a.friend.name}
                  width={24} // corresponds to w-6
                  height={24} // corresponds to h-6
                  className="rounded-full object-cover ring-2 ring-border"
                />
                <span className="text-sm text-foreground font-medium">
                  {a.friend.name}
                </span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
