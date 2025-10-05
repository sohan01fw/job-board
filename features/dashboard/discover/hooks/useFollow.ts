import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  followUserAction,
  unfollowUserAction,
  isFollowingAction,
  getFriendsAndFollowersAction,
} from "@/features/dashboard/discover/action";
import { User } from "@prisma/client";
import { toast } from "sonner";

// --------------------
// Queries
// --------------------

// Get friends / followers / following
export function useFriendsAndFollowers(userId: string) {
  return useQuery({
    queryKey: ["friendsAndFollowers", userId],
    queryFn: async (): Promise<{
      friends: User[];
      followingOnly: User[];
      followersOnly: User[];
    }> => {
      return await getFriendsAndFollowersAction({ userId });
    },
    enabled: !!userId,
  });
}

// Check if current user follows another
export function useIsFollowing(followerId: string, followingId: string) {
  return useQuery({
    queryKey: ["isFollowing", followerId, followingId],
    queryFn: async (): Promise<{ isFollowing: boolean }> => {
      return await isFollowingAction({ followerId, followingId });
    },
    enabled: !!followerId && !!followingId,
  });
}

// --------------------
// Mutations
// --------------------

export function useFollowUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: { followerId: string; followingId: string }) => {
      return await followUserAction(params);
    },
    onSuccess: (_, { followerId, followingId }) => {
      queryClient.setQueryData(["suggestion-users"], (old: any) =>
        old ? old.filter((user: any) => user.id !== followingId) : old,
      );
      queryClient.setQueryData(
        ["friendsAndFollowers", followerId],
        (old: any) => ({
          ...old,
          friends:
            old?.friends?.filter((f: any) => f.id !== followingId) || old,
        }),
      );

      queryClient.invalidateQueries({
        queryKey: ["friendsAndFollowers", followerId],
      });
      queryClient.invalidateQueries({
        queryKey: ["friendsAndFollowers", followingId],
      });
      queryClient.invalidateQueries({
        queryKey: ["suggestion-users"],
      });
      toast.success("User followed!");
    },
    onError: (error: any) => {
      console.error(error);
      toast.error(error?.message || "Failed to follow user");
    },
  });
}

interface UnfollowParams {
  followerId: string;
  followingId: string;
}

export function useUnfollowUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ followerId, followingId }: UnfollowParams) => {
      return await unfollowUserAction({ followerId, followingId });
    },

    // 1️⃣ Apply cache update AFTER successful server response
    onSuccess: (_, { followerId, followingId }) => {
      // Remove unfollowed user from friends
      queryClient.setQueryData(
        ["friendsAndFollowers", followerId],
        (old: any) => ({
          ...old,
          friends:
            old?.friends?.filter((f: any) => f.id !== followingId) || old,
        }),
      );

      // Optionally add back to suggestions
      queryClient.setQueryData(["suggestion-users"], (old: any) =>
        old ? [...old, { id: followingId }] : [{ id: followingId }],
      );

      // Refetch to sync with server just in case
      queryClient.invalidateQueries({
        queryKey: ["friendsAndFollowers", followerId],
      });
      queryClient.invalidateQueries({
        queryKey: ["friendsAndFollowers", followingId],
      });
      queryClient.invalidateQueries({ queryKey: ["suggestion-users"] });

      toast.success("User unfollowed!");
    },

    onError: (error: any) => {
      console.error(error);
      toast.error(error?.message || "Failed to unfollow user");
    },
  });
}
