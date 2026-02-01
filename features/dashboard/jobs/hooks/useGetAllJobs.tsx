import { useInfiniteQuery } from "@tanstack/react-query";
import { GetAllJobs } from "../action";
import { useJobSortStore } from "../lib/stores/sortstore";
import { useJobFilterStore } from "../lib/stores/filterStore";
import { useJobSearchStore } from "../lib/stores/joSearchStore";

interface JobApplication {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  status: string;
  userId: string;
  coverLetter: string;
  viewed: boolean;
  jobId: string;
}

interface Job {
  id: string;
  title: string;
  location: string;
  company: string;
  minSalary: number;
  maxSalary: number;
  jobType: string;
  workType: string;
  skills: string[];
  applied: boolean;
  jobApplications: JobApplication[];
  createdAt: Date;
  updatedAt: Date;
}

export interface JobsResponse {
  jobs: Job[];
  nextCursor?: string;
}

export function useGetAllJob() {
  const { sort } = useJobSortStore();
  const { filter } = useJobFilterStore();
  const { search } = useJobSearchStore();

  return useInfiniteQuery<
    JobsResponse,
    Error,
    JobsResponse,
    [string, string?, string[]?, string?],
    string | undefined
  >({
    queryKey: ["jobs", sort, filter, search],
    queryFn: async ({ pageParam }) => {
      const res = await GetAllJobs({
        sort,
        filter,
        search,
        cursor: pageParam,
        limit: 10,
      });
      return res;
    },
    getNextPageParam: (lastPage) => lastPage?.nextCursor ?? undefined,
    initialPageParam: undefined,
  });
}
