import { useMutation } from "@tanstack/react-query";
import { deleteUserAccountAction } from "../action";
import { supabase } from "@/lib/supabase/supabase_client";
import { useProfileStore } from "@/lib/stores/useProfileStore";
import { deleteUserFilesById } from "@/lib/Actions/UploadMultipleFiles";

export function useDeleteUserAccount() {
  return useMutation({
    mutationFn: async ({ userId }: { userId: string }) => {
      // Delete files for this user
      await deleteUserFilesById({ bucketName: "post-images", userId });

      await deleteUserFilesById({ bucketName: "resume", userId });

      await deleteUserFilesById({ bucketName: "avatars", userId });

      // Delete account from DB
      await deleteUserAccountAction({ userId });
    },

    onSuccess: () => {
      // Clear Zustand store
      useProfileStore.persist.clearStorage();
      useProfileStore.setState({ profileCompletion: 0 });
    },

    onError: (err: any) => console.error("Delete account error:", err),
  });
}

export const handleLogOutBtn = async (router: any) => {
  const { error } = await supabase.auth.signOut();
  console.log(error);

  // Client-side navigation
  router.replace("/");
};
