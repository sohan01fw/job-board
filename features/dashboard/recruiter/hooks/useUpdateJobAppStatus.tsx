import { useMutation } from "@tanstack/react-query";
import { Applicant } from "../types";
import { toast } from "sonner";
import { updateJobAppStatus } from "../actions";

export function useUpdateJobApplicantions() {
  const mutation = useMutation({
    mutationFn: ({
      applicants,
      newStatus,
    }: {
      applicants: Applicant;
      newStatus: "PENDING" | "ACCEPTED" | "REJECTED";
    }) =>
      updateJobAppStatus({
        applicationId: applicants.id,
        status: newStatus,
      }),
    onSuccess: async () => {
      toast.success("Status updated sucessfully!");
      // no state update → UI stays the same
    },
  });

  return mutation; // gives isLoading, data, error, mutateAsync
}
