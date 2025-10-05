import { useMutation } from "@tanstack/react-query";
import { deleteUserAccountAction } from "../action";
import { supabase } from "@/lib/supabase/supabase_client";

export function useDeleteUserAccount() {
  return useMutation({
    mutationFn: async ({ userId }: { userId: string }) => {
      await deleteUserAccountAction({ userId });
    },

    onError: (err: any) => {
      console.error("Delete account error:", err);
    },
  });
}

export const handleLogOutBtn = async (router: any) => {
  const { error } = await supabase.auth.signOut();
  console.log(error);

  // Client-side navigation
  router.replace("/");
};
