import { supabase } from "@/lib/supabase/supabase_client";

// Supabase login through magic link
export async function SupabaseMagicLinkLogin(emailValue: string | undefined) {
  const { data, error } = await supabase.auth.signInWithOtp({
    email: emailValue || "",
    options: {
      shouldCreateUser: true,
      emailRedirectTo: process.env.PROD_SITE_REDIRECT_URL,
    },
  });

  return { data, error };
}

// Supabase login through Google
export async function SupabaseGoogleLogin() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: process.env.PROD_SITE_REDIRECT_URL,
    },
  });
  return { data, error };
}
