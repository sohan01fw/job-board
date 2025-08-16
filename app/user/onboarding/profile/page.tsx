import { UserProfile } from "@/features/auth/components/onboarding/userprofile";
import { authUser, CheckUser, CreateUser } from "@/lib/Actions/Users";
import { UserData } from "@/types/Forms";
import { redirect } from "next/navigation";
export const dynamic = "force-dynamic";

export default async function page() {
  //authenticate the user if not present redirect to login page
  const userauth = await authUser();

  const user = userauth;
  if (!userauth || !user) {
    return redirect("/auth/login");
  }

  const checkUser = await CheckUser(user?.email || "");
  //save the user to database
  const fullname = user?.name;
  const profile_pic = user?.img;
  const userD: UserData = {
    id: user.id,
    email: user.email || "",
    name: fullname || "",
    img: profile_pic || "",
  };
  if (checkUser.data === false) {
    await CreateUser(userD);
  }

  return (
    <div className="">
      <div>
        <h1 className="text-gray-900 font-bold text-5xl ">onBoarding </h1>
        <p className="text-gray-500 ml-3 text-sm">Edit profile information</p>
      </div>
      <div className="">
        <UserProfile userData={user} />
      </div>
    </div>
  );
}
