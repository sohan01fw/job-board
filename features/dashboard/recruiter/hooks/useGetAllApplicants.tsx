import { useQuery } from "@tanstack/react-query";
import { GetAllApplicants } from "../actions";

export function useApplicants(jobId: string) {
  return useQuery({
    queryKey: ["applicants", jobId],
    queryFn: () => GetAllApplicants({ jobId }),
    refetchOnWindowFocus: false,
  });
}
