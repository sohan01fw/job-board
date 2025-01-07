import { supabase } from "./supabase/supabase_client";
import { authUser, CheckUser } from "@/lib/Actions/Users";
import { redirect } from "next/navigation";

//supabase login through magic link
export async function SupabaseMagicLinkLogin(emailValue: string | undefined) {
  const { data, error } = await supabase.auth.signInWithOtp({
    email: emailValue || "",
    options: {
      // set this to false if you do not want the user to be automatically signed up
      shouldCreateUser: true,
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard/overview`,
    },
  });

  return { data, error };
}

//supabase login through google link
export async function SupabaseGoogleLogin() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "http://localhost:3000/auth/callback",
    },
  });
  return { data, error };
}

//redirect user to it's desired destination
export async function redirectUser() {
  const data = await authUser();
  if (!data.user?.email) {
    return redirect("/auth/login");
  }
  const checkUser = await CheckUser(data.user?.email);
  if (checkUser.status === 404) {
    return redirect("/auth/onboarding/user/profile");
  }
  return redirect("/dashboard/overview");
}
//get session after user login
export async function LoginSession() {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();
  if (error) {
    return null;
  }
  return session;
}
