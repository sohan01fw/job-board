"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Eye } from "lucide-react";
import { EyeTooltip } from "./Tooltip";
import { JobData } from "@/features/dashboard/types";
import { Badge } from "@/components/ui/badge";
import ApplyDialog from "./JobApplyModel";

export default function JobViewModel({ job }: { job: JobData }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="cursor-pointer">
          <EyeTooltip>
            <Eye size={14} />
          </EyeTooltip>
        </div>
      </DialogTrigger>

      <DialogContent
        hideclose={false}
        className="custom-dialog  max-w-3xl max-h-[40rem] w-full sm:w-[90%] lg:w-[70%] p-6 overflow-y-auto"
      >
        {/* Header with Apply */}
        <div className="flex justify-between items-start mb-5">
          <DialogHeader className="p-0">
            {/* Company Info with Logo */}
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center font-bold text-primary">
                {job.company[0]}
              </div>
              <div>
                <h3 className="font-semibold text-lg">{job.company}</h3>
                <p className="text-xs text-muted-foreground">
                  {job.contactEmail}
                </p>
              </div>
            </div>

            {/* Job Title */}
            <DialogTitle className="text-2xl font-bold">
              {job.title}
            </DialogTitle>

            {/* Job Meta */}
            <DialogDescription className="text-sm text-muted-foreground mt-1">
              {job.location} • {job.workType} • {job.jobType}
            </DialogDescription>
          </DialogHeader>

          <ApplyDialog job={job} />
        </div>

        {/* Job meta */}
        <div className="flex flex-wrap gap-3 mb-5">
          <Badge variant="outline">Experience: {job.experience}</Badge>
          <Badge variant="outline">
            Salary: {job.minSalary} - {job.maxSalary} {job.currency}
          </Badge>
          <Badge variant="outline">Deadline: {job.applicationDeadline}</Badge>
        </div>

        {/* Job Description */}
        <div className="mb-5">
          <h4 className="text-lg font-semibold mb-2">Job Description</h4>
          <p className="text-sm text-muted-foreground">{job.description}</p>
        </div>

        {/* Requirements */}
        <div className="mb-5">
          <h4 className="text-lg font-semibold mb-2">Requirements</h4>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            {job.requirements.map((req, idx) => (
              <li key={idx}>{req}</li>
            ))}
          </ul>
        </div>

        {/* Skills */}
        <div className="mb-5">
          <h4 className="text-lg font-semibold mb-2">Skills</h4>
          <div className="flex flex-wrap gap-2">
            {job.skills.map((skill, idx) => (
              <Badge key={idx} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div>
          <h4 className="text-lg font-semibold mb-2">Benefits</h4>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            {job.benefits.map((benefit, idx) => (
              <li key={idx}>{benefit}</li>
            ))}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
}
