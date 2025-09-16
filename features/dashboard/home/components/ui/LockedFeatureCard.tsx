"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import Link from "next/link";

export default function LockedFeatureCard({
  profileCompletion,
}: {
  profileCompletion: number;
}) {
  return (
    <Card className="max-w-md mx-auto border border-green-200 shadow-md rounded-2xl">
      <CardHeader className="flex flex-col items-center text-center space-y-2">
        <div className="bg-green-100 p-3 rounded-full">
          <Lock className="h-8 w-8 text-green-600" />
        </div>
        <CardTitle className="text-lg font-semibold">
          Complete Your Profile
        </CardTitle>
        <CardDescription>
          Your profile is only{" "}
          <span className="font-semibold">{profileCompletion}%</span> complete.
          Please finish it to unlock this feature.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-2 bg-green-500 transition-all"
            style={{ width: `${profileCompletion}%` }}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button
          asChild
          className="bg-green-600 hover:bg-green-700 rounded-xl px-6"
        >
          <Link href="/dashboard/user/profile">Go to Profile</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
