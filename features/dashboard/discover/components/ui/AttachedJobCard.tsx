"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, MapPin, Calendar, Users, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useJobStore } from "../../lib/stores/JobStore";

type AttachedJobCardProps = {
  title: string;
  company: string;
  location: string;
  minSalary: number;
  maxSalary: number;
  currency: string;
  applicationDeadline: string;
  applicants: number;
};

export function AttachedJobCard({
  title,
  company,
  location,
  minSalary,
  maxSalary,
  currency,
  applicationDeadline,
  applicants,
}: AttachedJobCardProps) {
  const { clearJobId } = useJobStore();
  return (
    <Card className="w-full max-w-md rounded-2xl shadow-md hover:shadow-lg transition bg-background relative">
      {/* X button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => clearJobId()}
        className="absolute top-2 right-2 h-7 w-7 rounded-full"
      >
        <X className="h-4 w-4" />
      </Button>

      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        <p className="text-sm text-muted-foreground">{company}</p>
      </CardHeader>

      <CardContent className="space-y-2 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Briefcase className="h-4 w-4" />
          <span>
            {currency} {minSalary.toLocaleString()} –{" "}
            {maxSalary.toLocaleString()}
          </span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>
            Deadline: {new Date(applicationDeadline).toLocaleDateString()}
          </span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Users className="h-4 w-4" />
          <span>{applicants} applicants</span>
        </div>
      </CardContent>
    </Card>
  );
}
