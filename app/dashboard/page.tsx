// import { DashboardLayout } from "@/features/dashboard/components/DashboardLayout";
import DashboardHome from "@/features/dashboard/home/components/Home";
import {
  CreateUser,
  updateUserImage,
} from "@/features/dashboard/user/profile/actions";
import { getFileUrl, uploadFile } from "@/lib/Actions/FileUpload";
import { authUser, CheckUser } from "@/lib/Actions/Users";

export default async function page() {
  const user = await authUser();
  const isUser = await CheckUser(user.email);
  if (!isUser) {
    console.log("creating user");
    await CreateUser(user);
    await uploadFile({
      imageUrl: user.img,
      bucketName: "avatars",
      fileName: `${user.id}.png`,
    });
    const url = await getFileUrl({
      fileName: `${user.id}.png`,
      bucketName: "avatars",
    });

    await updateUserImage({
      userId: user.id,
      imageUrl: url.publicUrl || "",
    });
  }
  return (
    <div>
      {/*<DashboardLayout />*/}
      <DashboardHome />
    </div>
  );
}
