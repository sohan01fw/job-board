"use client";

import { Card, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useFollowUser, useFriendsAndFollowers } from "../../hooks/useFollow";
import { CachedUser } from "@/types/global";
import { ConfirmDialog } from "@/components/confirmDialog";

export default function MyFollowers({
  currentUser,
}: {
  currentUser: CachedUser;
}) {
  const { data, isLoading } = useFriendsAndFollowers(currentUser?.id || "");
  const { mutateAsync: followUser, isPending: isFollowingBack } =
    useFollowUser();

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>No followers</div>;

  // All users who follow me (friends + followersOnly)
  const followers = data.followersOnly ? [...data.followersOnly] : [];

  if (!followers.length) return <div>No one is following you yet.</div>;

  return (
    <div className="space-y-4">
      {followers.map((user) => (
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
              <ConfirmDialog
                title="Follow Back"
                description="Confirm you want to follow this user?"
                variant="outline"
                confirmTextColor="bg-green-500"
                confirmText={
                  isFollowingBack ? "Following Back..." : "Follow Back"
                }
                onConfirmAction={async () =>
                  await followUser({
                    followerId: currentUser.id,
                    followingId: user.id,
                  })
                }
              />
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
