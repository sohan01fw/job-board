import { NextRequest } from "next/server";
import { updateSession } from "./lib/supabase/supabase_middleware";

export async function middleware(req: NextRequest) {
  return await updateSession(req);
}

export const config = {
  matcher: ["/auth/:path*", "/dashboard/:path*"],
};
