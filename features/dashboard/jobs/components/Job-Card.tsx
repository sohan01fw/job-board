"use client";

import { MapPin, Clock, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { JobData } from "../../types";
import JobViewModel from "./ui/JobViewModel";
import ApplyDialog from "./ui/JobApplyModel";

export function JobCard({ job }: { job: JobData }) {
  return (
    <Card className="p-6 hover:shadow-lg transition-all rounded-2xl">
      <CardContent className="p-0">
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center font-bold text-primary`}
            >
              {job.company[0]}
            </div>

            <div>
              <h3 className="font-semibold text-lg">{job.company}</h3>
              <p className="text-xs text-muted-foreground">
                {job.contactEmail}
              </p>
            </div>
          </div>

          <div className="flex flex-row gap-2">
            <JobViewModel job={job} />
          </div>
        </div>

        {/* Title & Badges */}
        <div className="mb-4">
          <h4 className="text-xl font-bold text-foreground mb-2">
            {job.title}
          </h4>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">{job.workType}</Badge>
            <Badge variant="secondary">{job.jobType}</Badge>
            <Badge variant="outline">{job.experience}</Badge>
          </div>
        </div>

        {/* Meta info */}
        <div className="flex gap-10 text-sm text-muted-foreground mb-5">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4 " />
            {job.location}
          </div>

          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            Apply by {job.applicationDeadline}
          </div>
        </div>

        {/* Salary */}

        <div className="flex items-start gap-2 mb-5">
          <FileText className="w-4 h-4 mt-1 flex-shrink-0" />
          <p className="text-sm text-muted-foreground line-clamp-3">
            {job.description}
          </p>
        </div>
        <p className="font-medium text-foreground mb-5">
          <span className="text-green-500">$</span> {job.minSalary} -{" "}
          {job.maxSalary} {job.currency}
        </p>
        {/* Footer */}
        <div className="flex items-center justify-between">
          <ApplyDialog job={job} />
        </div>
      </CardContent>
    </Card>
  );
}
