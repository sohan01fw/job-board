import { supabase } from "@/lib/supabase/supabase_client";
import { REDIRECT_URL } from "@/lib/url";

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
