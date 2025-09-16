import { CreateUser, updateUserImage } from "../../user/profile/actions";
import { embedUserProfile } from "@/lib/ai/embed/userProfileEmbed";
import { getFileUrl, uploadFile } from "@/lib/Actions/FileUpload";
import { UserData } from "@/types/Forms";

export const createUser = async (user: UserData) => {
  await CreateUser(user); // critical, must wait

  // non-blocking
  embedUserProfile({ userId: user.id, userData: user });

  (async () => {
    await uploadFile({
      imageUrl: user.img || "",
      bucketName: "avatars",
      fileName: `${user.id}.png`,
    });
    const url = await getFileUrl({
      fileName: `${user.id}.png`,
      bucketName: "avatars",
    });
    await updateUserImage({ userId: user.id, imageUrl: url.publicUrl || "" });
  })();
};
