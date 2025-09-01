"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Building,
  DollarSign,
  Calendar,
  Mail,
  Users,
  Star,
} from "lucide-react";
import { useJobPostStore } from "../stores/postJobStore";

export function JobPreview() {
  const { jobData } = useJobPostStore();

  const formatSalary = () => {
    if (!jobData.salary.salaryMin && !jobData.salary.salaryMax)
      return "Salary not specified";
    if (jobData.salary.salaryMin && jobData.salary.salaryMax) {
      return `${jobData.salary.salaryCurrency} ${Number.parseInt(jobData.salary.salaryMin).toLocaleString()} - ${Number.parseInt(jobData.salary.salaryMax).toLocaleString()}`;
    }
    return jobData.salary.salaryMin
      ? `${jobData.salary.salaryCurrency} ${Number.parseInt(jobData.salary.salaryMin).toLocaleString()}+`
      : "Competitive salary";
  };

  const formatWorkType = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  const formatJobType = (type: string) => {
    return type
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const formatExperience = (exp: string) => {
    const levels = {
      entry: "Entry Level",
      mid: "Mid Level",
      senior: "Senior Level",
      executive: "Executive Level",
    };
    return levels[exp as keyof typeof levels] || exp;
  };

  return (
    <div className="sticky top-24">
      <Card className="shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-foreground mb-2">
                {jobData.title || "Job Title"}
              </h3>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                <div className="flex items-center gap-1">
                  <Building className="w-4 h-4" />
                  {jobData.company || "Company Name"}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {jobData.location || "Location"}
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-700"
                >
                  {formatWorkType(jobData.workType)}
                </Badge>
                <Badge variant="secondary">
                  {formatJobType(jobData.jobType)}
                </Badge>
                <Badge variant="secondary">
                  {formatExperience(jobData.experience)}
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-1 text-yellow-500">
              <Star className="w-4 h-4 fill-current" />
              <span className="text-sm font-medium">4.5</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Salary */}
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-green-600" />
            <span className="font-semibold text-lg">{formatSalary()}</span>
          </div>

          {/* Description */}
          {jobData.description && (
            <div>
              <h4 className="font-semibold mb-2">Job Description</h4>
              <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-wrap">
                {jobData.description}
              </p>
            </div>
          )}

          {/* Requirements */}
          {jobData.requirements.length > 0 && (
            <div>
              <h4 className="font-semibold mb-2">Requirements</h4>
              <ul className="space-y-1">
                {jobData.requirements.map((req, index) => (
                  <li
                    key={index}
                    className="text-sm text-muted-foreground flex items-start gap-2"
                  >
                    <span className="w-1 h-1 bg-green-600 rounded-full mt-2 flex-shrink-0" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Skills */}
          {jobData.skills.length > 0 && (
            <div>
              <h4 className="font-semibold mb-2">Required Skills</h4>
              <div className="flex flex-wrap gap-2">
                {jobData.skills.map((skill, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Benefits */}
          {jobData.benefits.length > 0 && (
            <div>
              <h4 className="font-semibold mb-2">Benefits</h4>
              <ul className="space-y-1">
                {jobData.benefits.map((benefit, index) => (
                  <li
                    key={index}
                    className="text-sm text-muted-foreground flex items-start gap-2"
                  >
                    <span className="w-1 h-1 bg-green-600 rounded-full mt-2 flex-shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Application Details */}
          <div className="border-t pt-4 space-y-3">
            {jobData.applicationDeadline && (
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span>
                  Apply by:{" "}
                  {new Date(jobData.applicationDeadline).toLocaleDateString()}
                </span>
              </div>
            )}

            {jobData.contactEmail && (
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span>{jobData.contactEmail}</span>
              </div>
            )}

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="w-4 h-4" />
              <span>12 applicants</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
