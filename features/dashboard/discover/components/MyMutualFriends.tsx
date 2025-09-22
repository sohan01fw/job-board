"use client";

import { Card, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useFriendsAndFollowers, useUnfollowUser } from "../hooks/useFollow";
import { CachedUser } from "@/types/global";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { MessageCircle } from "lucide-react";

export default function MyMutualFriends({
  currentUser,
}: {
  currentUser: CachedUser;
}) {
  const router = useRouter();
  const { data, isLoading } = useFriendsAndFollowers(currentUser?.id || "");
  const { mutate: unfollowUser, isPending } = useUnfollowUser();

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>No mutual friends</div>;

  const mutualFriends = data.friends; // only mutual follows

  if (!mutualFriends.length) return <div>No mutual friends yet.</div>;

  const handleUnfollow = async () => {
    unfollowUser({
      followerId: currentUser.id,
      followingId: mutualFriends[0].id,
    });
  };
  return (
    <div className="space-y-4">
      {mutualFriends.map((user) => (
        <Card key={user.id} className="hover:shadow-md transition rounded-xl">
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

              {/* Right: Message Button with Icon */}
              <div className="flex flex-row gap-4">
                <Button
                  size="sm"
                  variant="outline"
                  className="shrink-0 h-8 text-xs flex items-center gap-1"
                  onClick={() => router.push(`/dashboard/messages/${user.id}`)}
                >
                  <MessageCircle className="w-4 h-4" />
                  Message
                </Button>
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
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
