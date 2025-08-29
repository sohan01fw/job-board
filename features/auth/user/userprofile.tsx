import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { Imagesync } from "../ui/Imagesync";
import { Inputsync } from "../ui/Inputsync";
import { UserData } from "@/types/Forms";
export async function UserProfile({ userData }: { userData: UserData }) {
  return (
    <div className="">
      <div className="border border-black mt-10">
        <Card className="">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>add your profile pic</CardDescription>
            <div>
              <Imagesync email={`${userData.email}`} img={`${userData.img}`} />
            </div>
          </CardHeader>
          <CardContent>
            <Label className="font-semibold text-sm m-1">Email</Label>
            <Input
              className="ml-1 "
              disabled
              defaultValue={`${userData.email}`}
            />
          </CardContent>
          <CardContent>
            <Label className="font-semibold text-sm m-1">Full Name</Label>
            <Inputsync
              email={`${userData.email}`}
              name={`${userData.name}`}
              placeholder="write your full name"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
