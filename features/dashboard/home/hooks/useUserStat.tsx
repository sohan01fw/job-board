// hooks/useUserStats.ts
import { useQuery } from "@tanstack/react-query";
import { UserData } from "@/types/Forms";
import {
  getProfileViewsAction,
  jobApplicantionsCount,
  userApplicationStats,
} from "../actions";
import { getFriendsAndFollowersAction } from "../../discover/action";

export function useUserStats(user: UserData) {
  return useQuery({
    queryKey: ["userStats", user.id],
    queryFn: async () => {
      const jobstat = await userApplicationStats({ userId: user.id });
      const jobAppCount = await jobApplicantionsCount({ userId: user.id });
      const profileViews = await getProfileViewsAction({ userId: user.id });
      const data = await getFriendsAndFollowersAction({ userId: user.id });
      const { followerCount } = data;

      return {
        jobstat,
        jobAppCount,
        profileViews,
        followerCount,
      };
    },
  });
}
