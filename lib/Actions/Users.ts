"use server";

import { UserData } from "@/types/Forms";
import { prisma } from "../Prisma";
import { createServerSupabaseClient } from "../supabase/supabase_server";
import { withTryCatch } from "../tryCatch";

import { cache } from "react";

// supabase user
export const authUser = cache(async (): Promise<any> => {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase.auth.getUser();

  return {
    email: data.user?.email || "",
    id: data.user?.id || "",
    name: data.user?.user_metadata.name || "",
    img: data.user?.user_metadata.avatar_url || "",
  };
});
// check user in db
export const CheckUser = cache(async (userEmail: string) => {
  return withTryCatch(async () => {
    const user = await prisma.user.findUnique({ where: { email: userEmail } });
    return user;
  }, "Error while checking user");
});

export async function getUser() {
  const user = await authUser();
  const dbUser = await CheckUser(user.email); // throws if not found
  return dbUser as UserData;
}
