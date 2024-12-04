import NavigationTabs from "@/components/pages/dashboard/NavigationTabs";
import { authUser, CreateUser } from "@/lib/Actions/Users";
import { User } from "@/types/Forms";
import { redirect } from "next/navigation";
export default async function page() {
  //after user login store the user details to database
  const authResponse = await authUser();

  if (!authResponse || !authResponse.user) {
    return redirect("/auth/login");
  }
  const userData: User = {
    id: authResponse.user.id,
    email: authResponse.user.email || "",
    name: "",
  };
  try {
    await CreateUser(userData);
  } catch (error) {
    console.log(error);
  }
  return (
    <div className="m-2">
      <NavigationTabs />
    </div>
  );
}
