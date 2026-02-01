// hooks/useRecommendedJobs.ts
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/lib/Actions/Users";
import { UserData } from "@/types/Forms";
import { RecommendJobsAI } from "../lib/recommendedJobsAi";

export function useRecommendedJobs(topN: number = 5) {
  return useQuery({
    queryKey: ["recommendedJobs", topN],
    queryFn: async () => {
      const user: UserData = await getUser();
      return await RecommendJobsAI({ user, topN });
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  });
}
