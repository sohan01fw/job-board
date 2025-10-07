"use server";
import { supabaseServer } from "@/lib/supabase/supabase_server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  if (!code) {
    // no code, redirect to error page
    return NextResponse.redirect(`/auth/auth-code-error`);
  }

  const supabase = await supabaseServer();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    // exchange failed, redirect to error page
    return NextResponse.redirect(`/auth/auth-code-error`);
  }

  // determine redirect URL based on environment
  const redirectUrl =
    process.env.NODE_ENV === "development"
      ? `http://localhost:3000${next}`
      : `https://job-board-all.vercel.app${next}`;

  return NextResponse.redirect(redirectUrl);
}
