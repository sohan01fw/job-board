import { useMutation } from "@tanstack/react-query";
import { JobData } from "../../types";
import { createJob } from "../actions";
import { toast } from "sonner";

export function useCreateJobPost() {
  const mutation = useMutation({
    mutationFn: ({ job, email }: { job: JobData; email: string }) =>
      createJob(job, email),
    onSuccess: () => toast.success("Job posted!"),
    onError: (err: any) => toast.error(err.message),
  });

  return mutation; // gives isLoading, data, error, mutateAsync
}
