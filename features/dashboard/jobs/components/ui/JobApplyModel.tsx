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

interface ApplyDialogProps {
  job: JobApplicationData;
}

export default function ApplyDialog({ job }: ApplyDialogProps) {
  const [coverLetter, setCoverLetter] = React.useState("");
  const [error, setError] = React.useState("");
  const { mutate, isPending } = useApplyJob();

  const handleSubmit = () => {
    const result = applicationSchema.safeParse({ coverLetter });

    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }
    setError("");
    // TODO: call API to submit application
    mutate({ coverLetter, jobId: job.id!, userId: job.userId! });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-green-600 hover:bg-green-500 text-white rounded-lg px-6 py-2 shadow-md">
          Apply Now
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg rounded-2xl p-6 shadow-lg">
        <DialogHeader className="">
          <div
            className={`w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center font-bold text-primary`}
          >
            {job.company[0]}
          </div>
          <DialogTitle className="text-xl font-semibold">
            {job.title} at {job.company}
          </DialogTitle>
        </DialogHeader>

        <div className="mb-4 text-sm text-gray-600 space-y-1">
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
          className=" rounded-lg border border-gray-300 shadow-sm focus:border-green-500 focus:ring-1 focus:ring-green-500"
          rows={6}
        />
        {error && <p className="text-red-500 text-sm">{error} </p>}

        <DialogFooter>
          <Button
            onClick={handleSubmit}
            className="bg-green-600 hover:bg-green-500 text-white w-full rounded-lg shadow-md"
          >
            {isPending ? <p>Submitting...</p> : <p> Submit Application </p>}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
