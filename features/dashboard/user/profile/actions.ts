import { prisma } from "@/lib/Prisma";
import { withTryCatch } from "@/lib/tryCatch";
import { UserData } from "@/types/Forms";

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
  data: { name?: string; img?: string },
): Promise<any> {
  return withTryCatch(async () => {
    const updateData: { name?: string; img?: string } = {};
    if (data.name) updateData.name = data.name;
    if (data.img) updateData.img = data.img;

    if (Object.keys(updateData).length === 0) {
      throw new Error("No valid data provided for update");
    }

    return await prisma.user.update({
      where: { email },
      data: updateData,
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
