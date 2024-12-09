import { DataError, User } from "@/types/Forms";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Imagesync } from "@/components/sharedcomponents/onboarding/Imagesync";
import { Inputsync } from "@/components/sharedcomponents/onboarding/Inputsync";
import { UpdateUserName } from "@/lib/Actions/Users";
import { redirect } from "next/navigation";
export async function UserProfile({
  userData,
}: {
  userData: User | Omit<DataError, "error">;
}) {
  const img = "img" in userData;
  const email = "email" in userData;
  const name = "name" in userData;
  const handleInputProfile = async (value: string) => {
    "use server";
    if (email) return UpdateUserName(userData.email, value);
  };
  return (
    <div className="">
      <div className="border border-black mt-10">
        <Card className="">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>add your profile pic</CardDescription>
            <div>
              <Imagesync
                email={`${email && userData.email}`}
                img={`${img && userData.img}`}
              />
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
            <Inputsync
              name={`${name && userData.name}`}
              updateNameAction={handleInputProfile}
              placeholder="write your name"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
