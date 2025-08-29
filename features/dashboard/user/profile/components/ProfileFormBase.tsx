import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { authUser, CheckUser, CreateUser } from "@/lib/Actions/Users";
import type { UserData } from "@/types/Forms";
import { redirect } from "next/navigation";
import { Imagesync } from "@/features/auth/ui/Imagesync";
import { Inputsync } from "@/features/auth/ui/Inputsync";

export const dynamic = "force-dynamic";

export default async function UserCard() {
  // authenticate user
  const userauth = await authUser();
  if (!userauth) return redirect("/auth/login");

  // check and save user
  const checkUser = await CheckUser(userauth?.email || "");
  const userD: UserData = {
    id: userauth.id,
    email: userauth.email || "",
    name: userauth.name || "",
    img: userauth.img || "",
  };
  if (checkUser.data === false) await CreateUser(userD);

  return (
    <main className="min-h-screen flex items-center justify-center bg-green-50 px-4 py-12">
      <div className="w-full max-w-3xl">
        <header className="text-center mb-8">
          <h1 className="text-5xl font-extrabold text-green-800">Onboarding</h1>
          <p className="mt-2 text-lg text-green-600/80">
            Edit your profile information
          </p>
        </header>

        <Card className="rounded-2xl border-2 border-green-200 bg-white shadow-lg p-6">
          <CardHeader className="mb-4">
            <CardTitle className="text-2xl text-green-800 font-bold">
              Profile
            </CardTitle>
            <CardDescription className="text-green-600">
              Add your profile picture & details
            </CardDescription>
            <div className="mt-4">
              <Imagesync email={userauth.email} img={userauth?.img} />
            </div>
          </CardHeader>

          <CardContent className="grid gap-6">
            <div>
              <Label className="text-green-700 font-medium mb-1">Email</Label>
              <Input
                className="text-lg rounded-lg p-3"
                disabled
                defaultValue={userauth.email}
              />
            </div>

            <div>
              <Label className="text-green-700 font-medium mb-1">
                Full Name
              </Label>
              <Inputsync
                email={userauth.email}
                name={userauth.name || ""}
                placeholder="Write your full name"
              />
            </div>

            <div className="mt-4 flex gap-4 justify-center">
              <Button className="bg-green-600 text-white hover:bg-green-700">
                Save
              </Button>
              <Button
                variant="outline"
                className="border-green-200 text-green-700 hover:bg-green-50 bg-transparent"
              >
                Skip
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
