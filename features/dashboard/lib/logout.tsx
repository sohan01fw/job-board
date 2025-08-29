import { supabase } from "@/lib/supabase/supabase_client";
import { redirect } from "next/navigation";

export const handleLogOutBtn = async () => {
  const { error } = await supabase.auth.signOut();
  console.log(error);
  redirect("/");
};
