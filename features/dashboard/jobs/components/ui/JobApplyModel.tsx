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

interface ApplyDialogProps {
  job: JobApplicationData;
}

export default function ApplyDialog({ job }: ApplyDialogProps) {
  const [coverLetter, setCoverLetter] = React.useState("");
  const [error, setError] = React.useState("");
  const [isGenerating, setIsGenerating] = React.useState(false);

  const { mutate, isPending } = useApplyJob();

  const handleSubmit = () => {
    const result = applicationSchema.safeParse({ coverLetter });

    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }
    setError("");
    mutate({ coverLetter, jobId: job.id!, userId: job.userId! });
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
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-green-600 hover:bg-green-500 text-white rounded-lg px-6 py-2 shadow-md">
          Apply Now
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[90vw] max-w-6xl h-[90vh] rounded-2xl p-6 shadow-lg overflow-auto bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <DialogHeader className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 bg-gray-200 dark:bg-gray-700 rounded-xl flex items-center justify-center font-bold text-primary text-xl">
            {job.company[0]}
          </div>
          <DialogTitle className="text-2xl font-semibold">
            {job.title} at {job.company}
          </DialogTitle>
        </DialogHeader>

        <div className="mb-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
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
        </div>

        <Textarea
          placeholder="Write your cover letter here..."
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
          className="w-full h-[50vh] min-h-[300px] max-h-[60vh] rounded-lg border border-gray-300 dark:border-gray-700 shadow-sm focus:border-green-500 focus:ring-1 focus:ring-green-500 dark:bg-gray-800 dark:text-gray-100"
          rows={12}
        />

        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

        <div className="flex justify-between items-center mt-4 mb-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleGenerate}
            disabled={isGenerating}
            className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {isGenerating ? "Generating..." : "Generate with AI"}
          </Button>
        </div>

        <DialogFooter>
          <Button
            onClick={handleSubmit}
            className="bg-green-600 hover:bg-green-500 text-white w-full rounded-lg shadow-md"
          >
            {isPending ? "Submitting..." : "Submit Application"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
