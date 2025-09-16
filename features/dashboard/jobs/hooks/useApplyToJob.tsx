import { useMutation } from "@tanstack/react-query";
import { ApplyJob } from "../action";
import { toast } from "sonner";
import { createUserActivities } from "@/lib/Actions/createActivity";

export function useApplyJob() {
  return useMutation({
    mutationFn: async ({
      coverLetter,
      jobId,
      userId,
    }: {
      coverLetter: string;
      jobId: string;
      userId: string;
    }) => {
      // first apply to the job
      const application = await ApplyJob({ coverLetter, jobId, userId });

      // then log the activity (note: jobAppId should be the JobApplication.id, not jobId)
      await createUserActivities({
        userId,
        type: "JOB_PENDING",
        jobAppId: application.id, // use returned JobApplication.id
        status: "PENDING",
      });

      return application;
    },
    onSuccess: () => {
      toast.success("Application submitted successfully");
    },
    onError: (err) => {
      console.error("Failed to submit application", err);
      toast.error("Failed to submit application");
    },
  });
}
