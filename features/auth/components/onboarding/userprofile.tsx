import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { CheckUser } from "@/lib/Actions/Users";
import { Imagesync } from "./Imagesync";
import { Inputsync } from "./Inputsync";
export async function UserProfile({
  emailValue,
}: {
  emailValue: string | undefined;
}) {
  const userDatas = await CheckUser(emailValue || "");
  if ("error" in userDatas) {
    console.log(userDatas.message);
  }
  const userData = "data" in userDatas && userDatas.data;

  //console.log(userData);
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
            <Label className="font-semibold text-sm m-1">Name</Label>
            <Inputsync
              email={`${userData.email}`}
              name={`${userData.name}`}
              placeholder="write your name"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
