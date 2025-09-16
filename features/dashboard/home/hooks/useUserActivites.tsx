// hooks/useUserActivities.ts
import { useQuery } from "@tanstack/react-query";
import { UserData } from "@/types/Forms";
import { userActivities } from "../actions";
import { getActivityConfig } from "../lib/getAcitvityConfig";

export function useUserActivities(user: UserData) {
  return useQuery({
    queryKey: ["userActivities", user.id],
    queryFn: async () => {
      const activities = await userActivities({ userId: user.id });
      return activities.map(getActivityConfig);
    },
  });
}
