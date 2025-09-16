"use client";

import { useQuery } from "@tanstack/react-query";
import { GetAllPostedJobs } from "../actions";
import { usePostedJobsFilterStore } from "../stores/filterPostedJobs";
import { usePostedJobSortStore } from "../stores/sortPostedJobs";

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
