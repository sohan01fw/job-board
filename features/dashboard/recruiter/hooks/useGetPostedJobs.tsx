"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteJobPostAction,
  GetAllPostedJobs,
  getPostedJobByIdAction,
} from "../actions";
import { usePostedJobsFilterStore } from "../stores/filterPostedJobs";
import { usePostedJobSortStore } from "../stores/sortPostedJobs";
import { toast } from "sonner";

// Fetch jobs for a given user
export function usePostedJobs({ userId }: { userId: string }) {
  const { sort } = usePostedJobSortStore();
  const { filter } = usePostedJobsFilterStore();
  return useQuery({
    queryKey: ["PostedJobs", userId, sort, filter],
    queryFn: () =>
      GetAllPostedJobs({ sort: sort, filter: filter, userId: userId! }),
    enabled: !!userId, // only run if userId exists
  });
}

export function useGetPostedJobById({
  jobId,
  userId,
}: {
  jobId: string;
  userId: string;
}) {
  return useQuery({
    queryKey: ["PostedJobById", jobId],
    queryFn: () => getPostedJobByIdAction({ jobId, userId }),
    enabled: !!jobId && !!userId, // only run if both exist
  });
}

export function useDeleteJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ jobId }: { jobId: string }) =>
      deleteJobPostAction({ jobId }),
    onSuccess: () => {
      // Refetch posted jobs after successful deletion
      queryClient.invalidateQueries({ queryKey: ["PostedJobs"] });
      toast.success("Job post deleted successfully");
    },
    onError: (error) => {
      console.error("Error deleting job:", error);
      toast.error("Error deleting job");
    },
  });
}
