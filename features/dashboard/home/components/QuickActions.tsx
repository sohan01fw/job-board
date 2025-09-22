import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Briefcase, TrendingUp, Users } from "lucide-react";
import Link from "next/link";

export default function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>
          Common tasks to help you with your job search
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Button
            variant="outline"
            className="justify-start h-auto p-4 bg-transparent"
            asChild
          >
            <Link href="/dashboard/profile" aria-label="Update your profile">
              <Users
                className="h-5 w-5 mr-3 text-green-600"
                aria-hidden="true"
              />
              <div className="text-left">
                <div className="font-medium">Update Profile</div>
                <div className="text-xs text-muted-foreground">
                  Keep your info current
                </div>
              </div>
            </Link>
          </Button>
          <Button
            variant="outline"
            className="justify-start h-auto p-4 bg-transparent"
            asChild
          >
            <a href="/dashboard/jobs" aria-label="Search for new jobs">
              <Briefcase
                className="h-5 w-5 mr-3 text-green-600"
                aria-hidden="true"
              />
              <div className="text-left">
                <div className="font-medium">Search Jobs</div>
                <div className="text-xs text-muted-foreground">
                  Find new opportunities
                </div>
              </div>
            </a>
          </Button>
          <Button
            variant="outline"
            className="justify-start h-auto p-4 bg-transparent"
            asChild
          >
            <Link href="/dashboard/messages" aria-label="Check your messages">
              <Users
                className="h-5 w-5 mr-3 text-green-600"
                aria-hidden="true"
              />
              <div className="text-left">
                <div className="font-medium">Messages</div>
                <div className="text-xs text-muted-foreground">
                  Check conversations
                </div>
              </div>
            </Link>
          </Button>
          <Button
            variant="outline"
            className="justify-start h-auto p-4 bg-transparent"
            asChild
          >
            <Link
              href="/dashboard/discover"
              aria-label="Discover new companies"
            >
              <TrendingUp
                className="h-5 w-5 mr-3 text-green-600"
                aria-hidden="true"
              />
              <div className="text-left">
                <div className="font-medium">Discover</div>
                <div className="text-xs text-muted-foreground">
                  Explore companies
                </div>
              </div>
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
