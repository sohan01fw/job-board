"use server";
import { prisma } from "@/lib/Prisma";
import { withTryCatch } from "@/lib/tryCatch";
import { UserData } from "@/types/Forms";
import { User } from "@prisma/client";

// create user
export async function CreateUser(user: UserData): Promise<any> {
  return withTryCatch(async () => {
    return await prisma.user.create({
      data: {
        id: user.id, // optional, prisma will generate uuid if not provided
        name: user.name || "",
        email: user.email,
        phone: user.phone || "",
        location: user.location || "",
        title: user.title || "",
        experience: user.experience || "",
        education: user.education || "",
        bio: user.bio || "",
        skills: user.skills || [],
        website: user.website || "",
        linkedin: user.linkedin || "",
        github: user.github || "",
        jobType: user.jobType || [],
        salaryRange: user.salaryRange || "",
        remote: user.remote ?? false,
        relocate: user.relocate ?? false,
        img: user.img || "",
        resume: user.resume || "",
      },
    });
  }, "Error while creating user");
}

// update user profile
export async function UpdateUserProfile(
  email: string,
  data: Partial<Omit<User, "id" | "email">>, // any user fields except id/email
): Promise<any> {
  return withTryCatch(async () => {
    return await prisma.user.update({
      where: { email },
      data, // only provided fields are updated
    });
  }, "Error while updating user profile");
}

export async function updateUserImage({
  userId,
  imageUrl,
}: {
  userId: string;
  imageUrl: string;
}) {
  return withTryCatch(async () => {
    const updated = await prisma.user.update({
      where: { id: userId },
      data: { img: imageUrl },
    });
    return updated;
  }, "Error updating user image");
}

export const getUserFields = async (
  email: string,
  fields:
    | keyof Omit<User, "id" | "email">
    | (keyof Omit<User, "id" | "email">)[],
) => {
  const select = Array.isArray(fields)
    ? Object.fromEntries(fields.map((f) => [f, true]))
    : { [fields]: true };

  return await prisma.user.findUnique({
    where: { email },
    select,
  });
};
