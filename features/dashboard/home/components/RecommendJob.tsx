import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowUpRight, Building2, MapPin, TrendingUp } from "lucide-react";
import { recommendedJobs } from "../constant";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
// import { getUser } from "@/lib/Actions/Users";
// import { RecommendJobsAI } from "./ai/RecomendedJobAi";

export default async function RecommendJob() {
  // const user = await getUser();
  // const jobs = await RecommendJobsAI({ user: user, topN: 5 });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-green-600" aria-hidden="true" />
          Recommended for You
        </CardTitle>
        <CardDescription>
          Jobs that match your profile and preferences
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendedJobs.map((job, index) => (
            <div
              key={index}
              className="p-4 border rounded-lg hover:shadow-sm transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <Building2
                      className="h-4 w-4 text-muted-foreground"
                      aria-hidden="true"
                    />
                    <span className="text-sm font-medium text-foreground">
                      {job.company}
                    </span>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 border-green-200"
                    >
                      {job.match} match
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">
                    {job.position}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-3 w-3" aria-hidden="true" />
                      <span>{job.location}</span>
                    </div>
                    <span>•</span>
                    <span>{job.type}</span>
                    <span>•</span>
                    <span>{job.posted}</span>
                  </div>
                </div>
                <Button
                  size="sm"
                  className="ml-4 bg-green-600 hover:bg-green-700"
                >
                  Apply
                </Button>
              </div>
            </div>
          ))}
        </div>
        <Button
          variant="outline"
          className="w-full mt-4 bg-transparent"
          asChild
        >
          <a href="/dashboard/jobs" aria-label="View all recommended jobs">
            View All Jobs
            <ArrowUpRight className="h-4 w-4 ml-2" aria-hidden="true" />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}
