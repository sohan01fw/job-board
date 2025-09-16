import StatsGrid from "./StatGrid";
import { RecentActivity } from "./RecentActivity";
import QuickActions from "./QuickActions";
import { UserData } from "@/types/Forms";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowUpRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RecommendJobCard } from "./ui/RecommendJobCard";

export default function DashboardHome({ user }: { user: UserData }) {
  return (
    <div className="space-y-6 m-5">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Welcome back, {user.name}! 👋
        </h1>
        <p className="text-muted-foreground text-lg">
          Here’s what’s happening with your job search today.
        </p>
      </div>
      {/* Stats Grid */}
      <StatsGrid user={user} />
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-green-600" aria-hidden="true" />
              Recent Activity
            </CardTitle>
            <CardDescription>Your latest activities</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Recent Activity content */}
            <RecentActivity user={user} />
            <Button
              variant="outline"
              className="w-full mt-4 bg-transparent"
              asChild
            >
              <a
                href="/dashboard/history"
                aria-label="View all activity history"
              >
                View All Activity
                <ArrowUpRight className="h-4 w-4 ml-2" aria-hidden="true" />
              </a>
            </Button>
          </CardContent>
        </Card>

        {/* Recommended Jobs */}
        <RecommendJobCard />
      </div>
      {/* Quick Actions */}
      <QuickActions />
    </div>
  );
}
