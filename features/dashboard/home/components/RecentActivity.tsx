import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowUpRight,
  BookmarkPlus,
  Briefcase,
  Clock,
  Eye,
  MapPin,
  Users,
} from "lucide-react";
import { recentActivity } from "../constant";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-green-600" aria-hidden="true" />
          Recent Activity
        </CardTitle>
        <CardDescription>Your latest job search activities</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div
              key={index}
              className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex-shrink-0">
                {activity.type === "application" && (
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Briefcase
                      className="h-4 w-4 text-blue-600"
                      aria-hidden="true"
                    />
                  </div>
                )}
                {activity.type === "view" && (
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Eye
                      className="h-4 w-4 text-green-600"
                      aria-hidden="true"
                    />
                  </div>
                )}
                {activity.type === "save" && (
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <BookmarkPlus
                      className="h-4 w-4 text-yellow-600"
                      aria-hidden="true"
                    />
                  </div>
                )}
                {activity.type === "interview" && (
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <Users
                      className="h-4 w-4 text-purple-600"
                      aria-hidden="true"
                    />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-foreground truncate">
                    {activity.position} at {activity.company}
                  </p>
                  <Badge variant="secondary" className="ml-2 flex-shrink-0">
                    {activity.status}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-1">
                  <MapPin className="h-3 w-3" aria-hidden="true" />
                  <span>{activity.location}</span>
                  <span>•</span>
                  <span>{activity.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Button
          variant="outline"
          className="w-full mt-4 bg-transparent"
          asChild
        >
          <a href="/dashboard/history" aria-label="View all activity history">
            View All Activity
            <ArrowUpRight className="h-4 w-4 ml-2" aria-hidden="true" />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}
