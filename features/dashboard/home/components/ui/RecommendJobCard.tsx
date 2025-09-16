"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProfileStore } from "@/lib/stores/useProfileStore";
import LockedFeatureCard from "./LockedFeatureCard";

export function RecommendJobCard() {
  const profileCompletion = useProfileStore((s) => s.profileCompletion);

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
        {/* Recommended Jobs content */}
        {profileCompletion < 80 && (
          <LockedFeatureCard profileCompletion={profileCompletion} />
        )}
        {/*<RecommendJob />*/}
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
