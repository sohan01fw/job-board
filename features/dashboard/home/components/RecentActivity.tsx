"use client";

import { useEffect, useState, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { getIcon } from "../lib/getAcitvityConfig";
import RecentActivitySkeleton from "./ui/RecentAcitvitySkeleton";
import { CachedUser } from "@/types/global";
import Pusher from "pusher-js";
import Image from "next/image";
import { useUserActivities } from "../hooks/useUserActivites";

interface Activity {
  id: string;
  type: string;
  title: string;
  friend?: {
    id: string;
    name: string;
    img: string;
    email: string;
  } | null;
  status?: string;
  createdAt: string;
}

export function RecentActivity({ user }: { user: CachedUser }) {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useUserActivities(user);

  const [localActivities, setLocalActivities] = useState<Activity[]>([]);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (data && "pages" in data) {
      // TypeScript now knows pages exists
      const allActivities = (data as any).pages.flatMap(
        (page: any) => page.activities,
      );
      setLocalActivities(allActivities);
    }
  }, [data]);

  // Infinite scroll via IntersectionObserver
  useEffect(() => {
    if (!hasNextPage || !loadMoreRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) fetchNextPage();
      },
      { threshold: 1 },
    );
    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);

  // Realtime Pusher updates
  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
      authEndpoint: "/api/pusher/auth",
    });

    const channel = pusher.subscribe(`private-follow-${user.id}`);

    const handleEvent = (type: string, data: any) => {
      const newActivity: Activity = {
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

    [
      "new-follower",
      "new-following",
      "removed-follower",
      "removed-following",
      "follow-accepted",
    ].forEach((eventType) =>
      channel.bind(eventType, (data: any) => {
        handleEvent(eventType, data);
      }),
    );

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
      pusher.disconnect();
    };
  }, [user.id]);

  if (isLoading) return <RecentActivitySkeleton />;
  if (isError) return <p>Failed to load activities</p>;

  return (
    <div className="space-y-4 h-[30rem] overflow-y-auto">
      {localActivities.map((a) => (
        <div
          key={a.id}
          className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
        >
          <div className="flex-shrink-0">{getIcon(a.type)}</div>
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

            {a.friend && (
              <div className="flex items-center gap-2 mt-2">
                <Image
                  src={a.friend.img}
                  alt={a.friend.name}
                  width={24}
                  height={24}
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

      {hasNextPage && (
        <div
          ref={loadMoreRef}
          className="p-4 text-center text-muted-foreground"
        >
          {isFetchingNextPage ? "Loading more..." : "Scroll to load more"}
        </div>
      )}
    </div>
  );
}
