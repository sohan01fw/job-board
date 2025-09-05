import { useMutation } from "@tanstack/react-query";
import { ApplyJob } from "../action";
import { toast } from "sonner";

export function useApplyJob() {
  return useMutation({
    mutationFn: ({
      coverLetter,
      jobId,
      userId,
    }: {
      coverLetter: string;
      jobId: string;
      userId: string;
    }) => ApplyJob({ coverLetter, jobId, userId }),
    onSuccess: () => {
      toast.success("Application submitted successfully");
    },
    onError: (err) => {
      console.error("Failed to submit application", err);
      toast.error("Failed to submit application");
    },
  });
}
