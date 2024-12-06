import { authUser, CreateUser } from "@/lib/Actions/Users";
import { redirect } from "next/navigation";
import { User } from "@/types/Forms";

export default async function UserProfile() {
  const authResponse = await authUser();

  if (!authResponse || !authResponse.user) {
    return redirect("/auth/login");
  }
  const userData: User = {
    id: authResponse.user.id,
    email: authResponse.user.email || "",
    name: "",
    img: "",
  };
  try {
    await CreateUser(userData);
  } catch (error) {
    console.log(error);
  }
  return <div>this is on boarding page</div>;
}
