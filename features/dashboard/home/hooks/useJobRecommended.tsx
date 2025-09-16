// hooks/useRecommendedJobs.ts
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/lib/Actions/Users";
import { UserData } from "@/types/Forms";
import { RecommendJobsAI } from "../lib/RecomendedJobAi";

export function useRecommendedJobs(topN: number = 5) {
  return useQuery({
    queryKey: ["recommendedJobs", topN],
    queryFn: async () => {
      const user: UserData = await getUser();
      return await RecommendJobsAI({ user, topN });
    },
  });
}
