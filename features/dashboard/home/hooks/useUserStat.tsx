// hooks/useUserStats.ts
import { useQuery } from "@tanstack/react-query";
import { UserData } from "@/types/Forms";
import { jobApplicantionsCount, userApplicationStats } from "../actions";

export function useUserStats(user: UserData) {
  return useQuery({
    queryKey: ["userStats", user.id],
    queryFn: async () => {
      const jobstat = await userApplicationStats({ userId: user.id });
      const jobAppCount = await jobApplicantionsCount({ userId: user.id });

      return {
        jobstat,
        jobAppCount,
      };
    },
  });
}
