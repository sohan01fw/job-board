import { DataError, User } from "@/types/Forms";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Inputsync } from "@/components/sharedcomponents/Inputsync";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export async function UserProfile({
  userData,
}: {
  userData: User | Omit<DataError, "error">;
}) {
  const img = "img" in userData;
  const email = "email" in userData;
  const name = "name" in userData;

  return (
    <div className="">
      <div className="border border-black mt-10">
        <Card className="">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>add your profile pic</CardDescription>
            <div>
              <Avatar className="relative h-20 w-20">
                <AvatarImage
                  fetchPriority="high"
                  src={`${img && userData.img}`}
                />
                <div className="absolute mt-10 border border-black bottom-0 h-full w-full">
                  <Input
                    className="mt-5 rounded-full h-full w-full"
                    id="picture"
                    type="file"
                  />
                </div>
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
          </CardHeader>
          <CardContent>
            <Label className="font-semibold text-sm m-1">Email</Label>
            <Input
              className="ml-1 "
              disabled
              defaultValue={`${email && userData.email}`}
            />
          </CardContent>
          <CardContent>
            <Label className="font-semibold text-sm m-1">Name</Label>
            <Inputsync name={`${name && userData.name}`} />
          </CardContent>
          <CardFooter>
            <Link href="/auth/onboarding/user/company">
              <Button>Next</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
