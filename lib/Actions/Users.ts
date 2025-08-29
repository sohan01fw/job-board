"use server";

import { prisma } from "../Prisma";
import { createServerSupabaseClient } from "../supabase/supabase_server";
import { withTryCatch } from "../tryCatch";

// supabase user
export async function authUser(): Promise<any> {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase.auth.getUser();

  return {
    email: data.user?.email || "",
    id: data.user?.id || "",
    name: data.user?.user_metadata.name || "",
    img: data.user?.user_metadata.avatar_url || "",
  };
}

// check user in db
export async function CheckUser(userEmail: string): Promise<any> {
  return withTryCatch(async () => {
    const user = await prisma.user.findUnique({ where: { email: userEmail } });
    if (!user) throw new Error("user not found");
    return user;
  }, "Error while checking user");
}
