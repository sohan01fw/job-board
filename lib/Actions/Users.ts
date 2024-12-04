"use server";

import { User } from "@/types/Forms";
import { prisma } from "../Prisma";
import { createClient } from "../supabase/supabase_server";

export async function authUser() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  return data;
}

export async function CheckUser(userEmail: string) {
  try {
    // check user exists or not
    const checkUser = await prisma.user.findFirst({
      where: {
        email: userEmail,
      },
    });
    if (!checkUser) {
      return {
        error: true,
        message: "user not found",
      };
    }
    return checkUser;
  } catch (error) {
    console.log(error);
    return {
      error: true,
      message: "Error while find the user",
    };
  }
}
export async function CreateUser(user: User) {
  try {
    // check user exists or not
    const checkUser = await CheckUser(user.email);
    //save user to db
    if (!checkUser) {
      await prisma.user.create({
        data: { ...user, name: "" },
      });
    }
    return;
  } catch (error) {
    console.log(error);
  }
}
