"use server";
import { supabaseServer } from "@/lib/supabase/supabase_server";
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

    // Set cookie manually if needed (optional if supabase server client already handles cookies)
    // You can skip if your supabaseServer client already sets cookies automatically
    // const response = NextResponse.redirect(redirectUrl);
    // supabase.auth.setAuthCookie(response, data.session);

    // Determine redirect URL
    const redirectUrl =
      process.env.NODE_ENV === "development"
        ? `http://localhost:3000${next}`
        : `https://job-board-all.vercel.app${next}`;

    return NextResponse.redirect(redirectUrl);
  } catch (err) {
    console.error("Auth callback server error:", err);
    return NextResponse.redirect(`/auth/auth-code-error`);
  }
}
