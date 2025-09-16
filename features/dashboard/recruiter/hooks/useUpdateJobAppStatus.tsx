import { useMutation } from "@tanstack/react-query";
import { Applicant } from "../types";
import { toast } from "sonner";
import { updateJobAppStatus } from "../actions";
import { createUserActivities } from "@/lib/Actions/createActivity";

export function useUpdateJobApplicantions() {
  const mutation = useMutation({
    mutationFn: async ({
      applicants,
      newStatus,
    }: {
      applicants: Applicant;
      newStatus: "PENDING" | "ACCEPTED" | "REJECTED";
    }) => {
      // 1. Update application status
      const res = await updateJobAppStatus({
        applicationId: applicants.id,
        status: newStatus,
      });

      // 2. Record activity (fire & forget is fine)
      await createUserActivities({
        userId: applicants.user.id, // who applied
        type:
          newStatus === "PENDING"
            ? "JOB_PENDING"
            : newStatus === "ACCEPTED"
              ? "JOB_ACCEPTED"
              : "JOB_REJECTED",
        jobAppId: applicants.id, // JobApplication.id
        status: newStatus,
      });

      return res;
    },
    onSuccess: () => {
      toast.success("Status updated successfully!");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });

  return mutation; // { isLoading, data, error, mutateAsync }
}
