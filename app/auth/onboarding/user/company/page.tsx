import { authUser } from "@/lib/Actions/Users";
import { redirect } from "next/navigation";

export default async function UserCompany() {
  const authResponse = await authUser();

  if (!authResponse || !authResponse.user) {
    return redirect("/auth/login");
  }
  return <div>this is user company boarding page</div>;
}
