import useSWR from "swr";
import { GetAllJobs } from "../actions";

const fetcher = (category: string) => GetAllJobs(category);

export function useJobs(category: string | undefined) {
  return useSWR(category ? ["jobs", category] : null, () => fetcher(category!));
}
