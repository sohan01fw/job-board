import { authUser, CheckUser } from "@/lib/Actions/Users";
import { redirect } from "next/navigation";

//redirect user to it's desired destination
export async function redirectUser() {
  const data = await authUser();
  if (!data.user?.email) {
    return redirect("/auth/login");
  }
  const checkUser = await CheckUser(data.user?.email);
  if (checkUser.status === 404) {
    return redirect("/auth/onboarding");
  }
  return redirect("/dashboard/overview");
}
//get session after user login
// export async function LoginSession() {
//   const {
//     data: { session },
//     error,
//   } = await supabase.auth.getSession();
//   if (error) {
//     return null;
//   }
//   return session;
// }
