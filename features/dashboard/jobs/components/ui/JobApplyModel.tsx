"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { applicationSchema } from "../../lib/zod";
import { useApplyJob } from "../../hooks/useApplyToJob";
import { JobApplicationData } from "../../types";
import { generateCoverLetter } from "../../lib/generateCoverLetter";
import { getUser } from "@/lib/Actions/Users";
import { useUserStore } from "@/lib/stores/useUserStatusStore";
import { DisabledBtnTooltip } from "@/components/Tooltip";
import { useProfileStore } from "@/lib/stores/useProfileStore";
import { CachedUser } from "@/types/global";

interface ApplyDialogProps {
  job: JobApplicationData;
  user?: CachedUser;
}

export default function ApplyDialog({ job, user }: ApplyDialogProps) {
  const {
    user: { status },
  } = useUserStore();
  const [coverLetter, setCoverLetter] = React.useState("");
  const [error, setError] = React.useState("");
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const profileCompletion = useProfileStore((s) => s.profileCompletion);

  const { mutate, isPending } = useApplyJob();

  const handleSubmit = () => {
    const result = applicationSchema.safeParse({ coverLetter });

    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }
    setError("");
    mutate(
      { coverLetter, jobId: job.id!, userId: user?.id ?? "" },
      {
        onSuccess: () => {
          setCoverLetter("");
          setOpen(false); // close the dialog on success
        },
      },
    );
  };
  // console.log("job", job);

  const handleGenerate = async () => {
    setIsGenerating(true);
    const data = await getUser();
    const stream = await generateCoverLetter(data, job);

    for await (const delta of stream) {
      setCoverLetter((prev) => prev + delta);
    }

    setIsGenerating(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {user &&
          (status !== "OPENTOWORK" ? (
            <DisabledBtnTooltip>
              <Button
                disabled={true}
                className="bg-green-600 hover:bg-green-500 text-white rounded-lg px-6 py-2 shadow-md"
              >
                Apply Now
              </Button>
            </DisabledBtnTooltip>
          ) : (
            <Button className="bg-green-600 hover:bg-green-500 text-white rounded-lg px-6 py-2 shadow-md">
              Apply Now
            </Button>
          ))}
      </DialogTrigger>

      <DialogContent className="w-[90vw] max-w-6xl h-[90vh] rounded-2xl p-6 shadow-2xl overflow-auto bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        {/* Header */}
        <DialogHeader className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 dark:bg-gray-700 rounded-xl flex items-center justify-center font-bold text-primary text-2xl sm:text-3xl">
            {job.company[0]}
          </div>
          <div className="flex-1 text-center sm:text-left">
            <DialogTitle className="text-2xl sm:text-3xl font-semibold">
              {job.title} at {job.company}
            </DialogTitle>
            <p className="text-gray-500 dark:text-gray-400 mt-1 sm:mt-2 text-sm sm:text-base">
              Deadline: {new Date(job.applicationDeadline).toLocaleDateString()}
            </p>
          </div>
        </DialogHeader>

        {/* Job Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-sm sm:text-base text-gray-700 dark:text-gray-300">
          <p>
            <span className="font-medium">Location:</span> {job.location}
          </p>
          <p>
            <span className="font-medium">Type:</span> {job.workType} /{" "}
            {job.jobType}
          </p>
          <p>
            <span className="font-medium">Experience:</span> {job.experience}
          </p>
          <p>
            <span className="font-medium">Salary:</span> {job.currency}{" "}
            {job.minSalary.toLocaleString()} - {job.maxSalary.toLocaleString()}
          </p>
          <p className="sm:col-span-2">
            <span className="font-medium">Company Email:</span>{" "}
            {job.contactEmail}
          </p>
          <p className="sm:col-span-2">
            <span className="font-medium">Benefits:</span>{" "}
            {job?.benefits?.join(", ")}
          </p>
        </div>

        {/* Job Description */}
        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-gray-100">
            Job Description
          </h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base whitespace-pre-line">
            {job.description}
          </p>
        </div>

        {/* Requirements & Skills */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
              Requirements:
            </h4>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 text-sm sm:text-base">
              {job?.requirements?.map((req, idx) => (
                <li key={idx}>{req}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
              Skills:
            </h4>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 text-sm sm:text-base">
              {job?.skills?.map((skill, idx) => (
                <li key={idx}>{skill}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Cover Letter */}
        <div className="mb-4">
          <Textarea
            placeholder="Write your cover letter here..."
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            className="w-full h-[50vh] min-h-[300px] max-h-[60vh] rounded-lg border border-gray-300 dark:border-gray-700 shadow-sm focus:border-green-500 focus:ring-1 focus:ring-green-500 dark:bg-gray-800 dark:text-gray-100"
            rows={12}
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-4 mb-6 gap-3 sm:gap-0">
          <Button
            type="button"
            variant="outline"
            onClick={handleGenerate}
            disabled={profileCompletion < 80 || isGenerating}
            className="w-full sm:w-auto border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {isGenerating ? "Generating..." : "Generate with AI"}
          </Button>
          {profileCompletion < 80 && (
            <span className="text-gray-500 dark:text-gray-400 text-sm mt-2 sm:mt-0 sm:ml-3">
              80% profile completion required to use AI
            </span>
          )}
        </div>

        <DialogFooter>
          <Button
            onClick={handleSubmit}
            className="bg-green-600 hover:bg-green-500 text-white w-full rounded-lg shadow-md py-3 sm:py-4 text-base sm:text-lg"
          >
            {isPending ? "Submitting..." : "Submit Application"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
