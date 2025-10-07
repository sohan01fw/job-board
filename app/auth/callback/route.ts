"use server";
import { supabaseServer } from "@/lib/supabase/supabase_server";
import { SITE_URL } from "@/lib/url";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");
    const next = searchParams.get("next") ?? "/dashboard";

    if (!code) {
      return NextResponse.redirect(`/auth/auth-code-error`);
    }

    const supabase = await supabaseServer();

    // Exchange the code for session
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error || !data.session) {
      console.error("Supabase code exchange error:", error);
      return NextResponse.redirect(`/auth/auth-code-error`);
    }

    // Redirect using production URL only
    const redirectUrl = `${SITE_URL}${next}`;

    return NextResponse.redirect(redirectUrl);
  } catch (err) {
    console.error("Auth callback server error:", err);
    return NextResponse.redirect(`/auth/auth-code-error`);
  }
}
