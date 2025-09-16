"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, UserPlus } from "lucide-react";
import { Briefcase, Eye, Users } from "lucide-react";
import { UserData } from "@/types/Forms";
import { useUserStats } from "../hooks/useUserStat";
import StatsGridSkeleton from "./ui/StatGridSkeleton";

export default function StatsGrid({ user }: { user: UserData }) {
  const { data, isLoading, isError } = useUserStats(user);

  if (isLoading) return <StatsGridSkeleton />;
  if (isError || !data) return <p>Failed to load stats</p>;

  const { jobstat, jobAppCount } = data;

  const stats = [
    {
      title: "Total Applications",
      value: jobstat.value,
      change: `+${jobstat.change}`,
      trend: jobstat.trend,
      icon: Briefcase,
      description: "Applications this week",
    },
    {
      title: "Profile Views",
      value: "1,247",
      change: "+8%",
      trend: "up",
      icon: Eye,
      description: "Views this week",
    },
    {
      title: "Followers",
      value: "18",
      change: "+3",
      trend: "up",
      icon: UserPlus,
      description: "New followers this week",
    },
    {
      title: "Interview Invites",
      value: jobAppCount.value,
      change: `+${jobAppCount.change}`,
      trend: jobAppCount.trend,
      icon: Users,
      description: "Pending interviews this week",
    },
  ];
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <Icon
                className="h-4 w-4 text-muted-foreground"
                aria-hidden="true"
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {stat.value}
              </div>
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                <TrendingUp
                  className="h-3 w-3 text-green-600"
                  aria-hidden="true"
                />
                <span className="text-green-600 font-medium">
                  {stat.change}
                </span>
                <span>from last period</span>
              </div>
              <p
                className="text-xs text-muted-foreground mt-1"
                aria-label={`${stat.title}: ${stat.description}`}
              >
                {stat.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
