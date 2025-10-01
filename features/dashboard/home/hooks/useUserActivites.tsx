// hooks/useUserActivities.ts
import { useQuery } from "@tanstack/react-query";
import { userActivities } from "../actions";
import { getActivityConfig } from "../lib/getAcitvityConfig";
import { CachedUser } from "@/types/global";

export function useUserActivities(user: CachedUser) {
  return useQuery({
    queryKey: ["userActivities", user.id],
    queryFn: async () => {
      const activities = await userActivities({ userId: user.id });
      return activities.map(getActivityConfig);
    },
  });
}
