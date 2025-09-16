"use client";

import { Badge } from "@/components/ui/badge";
import { UserData } from "@/types/Forms";
import { getIcon } from "../lib/getAcitvityConfig";
import { useUserActivities } from "../hooks/useUserActivites";
import RecentActivitySkeleton from "./ui/RecentAcitvitySkeleton";

export function RecentActivity({ user }: { user: UserData }) {
  const { data: activities, isLoading, isError } = useUserActivities(user);

  if (isLoading) return <RecentActivitySkeleton />;
  if (isError || !activities) return <p>Failed to load activities</p>;

  return (
    <div className="space-y-4  h-[30rem] overflow-y-auto">
      {activities.map((a) => (
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
                <Badge variant="secondary" className="ml-2 flex-shrink-0">
                  {a.status}
                </Badge>
              )}
            </div>
            {a.meta && (
              <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-1">
                {a.meta.map((m, i) => (
                  <span key={i} className="flex items-center gap-1">
                    {m.icon}
                    {m.label}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
