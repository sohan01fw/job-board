"use server";

import { DataError, User } from "@/types/Forms";
import { prisma } from "../Prisma";
import { createClient } from "../supabase/supabase_server";

export async function authUser() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  return data;
}

export async function CheckUser(userEmail: string): Promise<DataError | User> {
  try {
    // check user exists or not
    const checkUser = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });
    if (!checkUser) {
      return {
        error: true,
        message: "user not found",
        status: 404,
      };
    }
    const userdata: User = {
      email: checkUser.email,
      id: checkUser.id,
      name: checkUser.name || "",
      img: checkUser.img || "",
    };
    return userdata;
  } catch (error) {
    console.log(error);
    return {
      error: true,
      message: "Error while find the user",
      status: 500,
    };
  }
}
export async function CreateUser(user: User): Promise<void> {
  try {
    // check user exists or not
    const checkUser: CheckUserData = await CheckUser(user.email);
    //save user to db
    if ("error" in checkUser) {
      await prisma.user.create({
        data: {
          id: user.id,
          name: user.name || "",
          email: user.email,
          img: user.img || "",
        },
      });
      return;
    }
  } catch (error) {
    console.log("error while creating new user", error);
  }
}

//fetch the user
export async function FetchUser(
  email: string,
): Promise<User | Omit<DataError, "error">> {
  try {
    // check user exists or not

    const checkUser: User | DataError = await CheckUser(email);
    if ("error" in checkUser) {
      const { message, status } = checkUser; // Log and omit `error`
      console.log("Error fetching user:", { message, status });
      return { message, status }; // Return only the data part
    }

    return checkUser; // Return the user data if found
  } catch {
    const errorMessage = {
      message: "Unexpected error occurred",
      status: 500,
    };
    console.log("Unexpected error:", errorMessage);
    return errorMessage; // Return only the necessary data
  }
}
