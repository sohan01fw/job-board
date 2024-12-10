import { UserProfile } from "@/components/pages/auth/onboarding/userprofile";
import {
  authUser,
  CheckUser,
  CreateUser,
  FetchUser,
} from "@/lib/Actions/Users";
import { User } from "@/types/Forms";
import { redirect } from "next/navigation";
export const dynamic = "force-dynamic";
export default async function page() {
  //authenticate the user if not present redirect to login page
  const userauth = await authUser();
  if (!userauth || !userauth.user?.email) {
    return redirect("/auth/login");
  }
  const user = userauth.user;
  //check user if exists redirect to dashboard
  const userExist = await CheckUser(user.email || "");
  if (userExist) {
    redirect("/dashboard");
  }
  //save the user to database
  const fullname =
    user?.identities && user?.identities[0].identity_data?.full_name;
  const profile_pic =
    user?.identities && user?.identities[0].identity_data?.avatar_url;
  const userData: User = {
    id: user.id,
    email: user.email || "",
    name: fullname || "",
    img: profile_pic || "",
  };
  await CreateUser(userData);

  //fetch user data from database
  const getUserData = await FetchUser(userauth.user?.email);
  return (
    <div className="">
      <div>
        <h1 className="text-gray-900 font-bold text-5xl ">onBoarding </h1>
        <p className="text-gray-500 ml-3 text-sm">Edit profile information</p>
      </div>
      <div className="">
        <UserProfile userData={getUserData} />
      </div>
    </div>
  );
}
