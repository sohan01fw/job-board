"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAllUsersExcept } from "../hooks/useSuggestionUsers";
import { CachedUser } from "@/types/global";
import { useFollowUser } from "../hooks/useFollow";
import { ConfirmDialog } from "@/components/confirmDialog";
import Link from "next/link";
import PeopleYouMayKnowLoading from "./ui/SuggetionUserLoading";

export function SuggestedConnections({
  currentUser,
}: {
  currentUser: CachedUser;
}) {
  const { data: users = [], isLoading } = useAllUsersExcept(currentUser.id);
  const { mutateAsync: followUser, isPending: isFollowing } = useFollowUser();

  if (isLoading)
    return (
      <div>
        <PeopleYouMayKnowLoading />
      </div>
    );
  if (!users.length || users.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">People you may know</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            No suggestions right now
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">People you may know</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {users.slice(0, 5).map((user) => (
            <div key={user.id} className="flex items-start gap-3">
              <Link href={`/dashboard/user/${user.id}`}>
                <Avatar className="w-12 h-12">
                  <AvatarImage
                    src={user.img || "/placeholder.svg"}
                    alt={user.name || "User"}
                  />
                  <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
              </Link>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <Link
                    href={`/dashboard/user/${user.id}`}
                    className="min-w-0 flex-1"
                  >
                    <h4 className="font-medium text-sm text-foreground truncate">
                      {user.name || "Unnamed User"}
                    </h4>
                  </Link>
                </div>

                {/* Follow button */}
                <div className="flex gap-2 mt-2">
                  <ConfirmDialog
                    title="Follow"
                    description="Confirm you want to follow this user?"
                    variant="outline"
                    confirmTextColor="bg-green-500"
                    confirmText={isFollowing ? "Following..." : "Follow"}
                    onConfirmAction={async () =>
                      await followUser({
                        followerId: currentUser.id,
                        followingId: user.id,
                      })
                    }
                  />
                </div>
              </div>
            </div>
          ))}

          <Button variant="outline" className="w-full mt-4 bg-transparent">
            See all suggestions
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
