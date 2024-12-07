import Login from "@/components/pages/auth/Login";
import { authUser } from "@/lib/Actions/Users";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const data = await authUser();
  if (data.user !== null) {
    return redirect("/auth/onboarding/user/profile");
  }

  return (
    <div className="login-container ">
      <Login />
    </div>
  );
}
