import { UserProfile } from "@/components/pages/auth/onboarding/userprofile";
import { authUser, CreateUser } from "@/lib/Actions/Users";
import { User } from "@/types/Forms";
import { redirect } from "next/navigation";
export const dynamic = "force-dynamic";
export default async function page() {
  //authenticate the user if not present redirect to login page
  const userauth = await authUser();
  const user = userauth.user;
  if (!userauth || !user) {
    return redirect("/auth/login");
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
  const userdata = await CreateUser(userData);
  if ("error" in userdata) {
    console.log({ msg: userdata.message, status: userdata.status });
  }

  return (
    <div className="">
      <div>
        <h1 className="text-gray-900 font-bold text-5xl ">onBoarding </h1>
        <p className="text-gray-500 ml-3 text-sm">Edit profile information</p>
      </div>
      <div className="">
        <UserProfile emailValue={user.email} />
      </div>
    </div>
  );
}
