"use server";

import { createClient } from "../supabase/supabase_server";

export async function authUser() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  return data;
}
