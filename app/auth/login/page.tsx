import Login from "@/components/pages/auth/Login";
import { redirectUser } from "@/lib/process";

export default async function LoginPage() {
  return (
    <div className="login-container ">
      <Login />
    </div>
  );
}
