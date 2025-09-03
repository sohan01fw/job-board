"use client";

import { useQuery } from "@tanstack/react-query";
import { GetAllJobs } from "../action";
import { useJobSortStore } from "../lib/stores/sortstore";
import { useJobFilterStore } from "../lib/stores/filterStore";

export function useGetAllJob() {
  const { sort } = useJobSortStore();
  const { filter } = useJobFilterStore();
  const query = useQuery({
    queryKey: ["jobs", sort, filter],
    queryFn: () => GetAllJobs({ sort: sort, filter: filter }),
  });

  return query; // { data, isLoading, error, refetch, ... }
}
