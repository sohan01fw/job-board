"use server";

import { prisma } from "../Prisma";
import { funcResponse } from "@/types/global";
import { createServerSupabaseClient } from "../supabase/supabase_server";
import { UserData } from "@/types/Forms";

//check the user in supabase authentication clientside(not db)
export async function authUser() {
  const supabase = await createServerSupabaseClient();

  const { data } = await supabase.auth.getUser();

  const user: UserData = {
    email: data.user?.email || "",
    id: data.user?.id || "",
    name: data.user?.user_metadata.name || "",
    img: data.user?.user_metadata.avatar_url || "",
  };

  return user;
}
//checking user exist in db or not
export async function CheckUser(userEmail: string): Promise<funcResponse> {
  try {
    // check user exists or not
    const checkUser = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });

    if (!checkUser) {
      return {
        data: false,
        error: true,
        message: "user not found",
        status: 404,
      };
    }

    return {
      data: checkUser,
      message: "successfully check the user data",
      status: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      data: false,
      error: true,
      message: "Error while check the user",
      status: 500,
    };
  }
}

//create a new user if not already exist in db
export async function CreateUser(user: UserData): Promise<funcResponse | any> {
  try {
    console.log("creating new user");
    const createUserData = await prisma.user.create({
      data: {
        id: user.id,
        name: user.name || "",
        email: user.email,
        img: user.img || "",
      },
    });
    return {
      data: createUserData,
      message: "successfully create user",
      status: 200,
    };
  } catch (error) {
    console.log("error while creating new user", error);
    return {
      data: false,
      error: true,
      message: "Unexpected error occur creating user",
      status: 500,
    };
  }
}

//update the user name and image
export async function UpdateUserProfile(
  email: string,
  data: { name?: string; img?: string },
): Promise<funcResponse> {
  try {
    // Check if the user exists
    const checkUser = await CheckUser(email);
    if ("error" in checkUser) {
      return {
        data: false,
        error: checkUser.error,
        message: checkUser.message,
        status: checkUser.status,
      };
    }

    // Filter out undefined or empty values from the data object
    const updateData: { name?: string; img?: string } = {};
    if (data.name) updateData.name = data.name;
    if (data.img) updateData.img = data.img;

    // If no valid data is provided to update, return an error
    if (Object.keys(updateData).length === 0) {
      return {
        data: false,
        error: true,
        message: "No valid data provided for update",
        status: 400,
      };
    }

    // Perform the update
    const updatedUser = await prisma.user.update({
      where: {
        email: email,
      },
      data: updateData,
    });

    return {
      message: "User successfully updated",
      status: 200,
      data: updatedUser, // Include the updated user data if needed
    };
  } catch (error) {
    console.log("Unexpected error:", error);
    return {
      data: false,
      error: true,
      message: "Unexpected error occurred",
      status: 500,
    };
  }
}
