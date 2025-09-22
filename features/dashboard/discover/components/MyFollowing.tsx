"use client";

import { Card, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useFriendsAndFollowers, useUnfollowUser } from "../hooks/useFollow";
import { CachedUser } from "@/types/global";
import { Button } from "@/components/ui/button";

export default function MyFollowing({
  currentUser,
}: {
  currentUser: CachedUser;
}) {
  const { data, isLoading } = useFriendsAndFollowers(currentUser?.id || "");
  const { mutate: unfollowUser, isPending } = useUnfollowUser();

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>No following</div>;

  const following = [...data.followingOnly];

  if (!following.length) return <div>You are not following anyone yet.</div>;

  const handleUnfollow = async () => {
    unfollowUser({ followerId: currentUser.id, followingId: following[0].id });
  };
  return (
    <div className="space-y-4">
      {following.map((user) => (
        <Card key={user.id} className="hover:shadow-md transition">
          <CardHeader>
            <div className="flex items-center justify-between gap-4 flex-wrap">
              {/* Left: Avatar + Name */}
              <div className="flex items-center gap-3 min-w-0">
                <Avatar className="w-10 h-10">
                  <AvatarImage
                    src={user.img || "/placeholder.svg"}
                    alt={user.name || "User"}
                  />
                  <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col truncate">
                  <span className="font-medium truncate">
                    {user.name || "Unnamed User"}
                  </span>
                  {user.location && (
                    <span className="text-xs text-muted-foreground truncate">
                      {user.location}
                    </span>
                  )}
                </div>
              </div>

              {/* Right: Action */}
              <Button
                variant="outline"
                size="sm"
                onClick={handleUnfollow}
                disabled={isPending}
                className="shrink-0"
              >
                {isPending ? "Unfollowing..." : "Unfollow"}
              </Button>
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
