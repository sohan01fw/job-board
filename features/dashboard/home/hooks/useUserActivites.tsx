// hooks/useUserActivities.ts
import { useInfiniteQuery } from "@tanstack/react-query";
import { userActivities } from "../actions";
import { getActivityConfig } from "../lib/getAcitvityConfig";
import { CachedUser } from "@/types/global";

export function useUserActivities(user: CachedUser) {
  return useInfiniteQuery<
    { activities: any[]; nextCursor?: string }, // return type
    Error, // error type
    { activities: any[]; nextCursor?: string }, // data type for useInfiniteQuery
    [string, string], // query key type
    string | undefined // pageParam type
  >({
    queryKey: ["userActivities", user.id],
    queryFn: async ({ pageParam }) => {
      const res = await userActivities({
        userId: user.id,
        cursor: pageParam,
        limit: 7,
      });
      return {
        activities: res.activities.map(getActivityConfig),
        nextCursor: res.nextCursor,
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    initialPageParam: undefined,
  });
}
