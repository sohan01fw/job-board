import StatsGrid from "./StatGrid";
import RecentActivity from "./RecentActivity";
import RecommendJob from "./RecommendJob";
import QuickActions from "./QuickActions";

export default function DashboardHome() {
  return (
    <div className="space-y-6 m-5">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Welcome back, Sarah! 👋
        </h1>
        <p className="text-muted-foreground text-lg">
          Here’s what’s happening with your job search today.
        </p>
      </div>

      {/* Stats Grid */}
      <StatsGrid />

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <RecentActivity />

        {/* Recommended Jobs */}
        <RecommendJob />
      </div>

      {/* Quick Actions */}
      <QuickActions />
    </div>
  );
}
