import { supabase } from "@/lib/supabase/supabase_client";

// Use only production URL
const REDIRECT_URL = `https://job-board-all.vercel.app/auth/callback`;

// Supabase login through magic link
export async function SupabaseMagicLinkLogin(emailValue: string | undefined) {
  const { data, error } = await supabase.auth.signInWithOtp({
    email: emailValue || "",
    options: {
      shouldCreateUser: true,
      emailRedirectTo: REDIRECT_URL,
    },
  });

  return { data, error };
}

// Supabase login through Google
export async function SupabaseGoogleLogin() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: REDIRECT_URL,
    },
  });
  return { data, error };
}
