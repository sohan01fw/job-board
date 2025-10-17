import { toast } from "sonner";
import { getUserFields, updateUserProfileAction } from "../actions";
import { Status, User } from "@prisma/client";
import { useLoading } from "@/lib/Hooks/useLoading";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useUserStore } from "@/lib/stores/useUserStatusStore";

export const useUpdateUser = () => {
  const { loading, withLoading } = useLoading();

  const updateUser = (
    email: string,
    data: Partial<Omit<User, "id" | "email">>,
    dirtyFields: any,
  ) =>
    withLoading(async () => {
      const filteredData = Object.fromEntries(
        Object.entries(data).filter(
          ([key]) => dirtyFields[key as keyof typeof dirtyFields],
        ),
      );
      const result = await updateUserProfileAction({
        data: filteredData,
        email,
      });
      toast.success("Profile updated successfully!", {
        duration: 1500,
        position: "top-right",
      });
      return result;
    });

  return { updateUser, loading };
};

//for status
export function useUpdateStatus({ email }: { email: string }) {
  const { updateStatusLocal } = useUserStore();

  const mutation = useMutation({
    mutationFn: ({ status }: { status: Status }) =>
      updateUserProfileAction({ email, data: { status } }),

    onSuccess: ({ status }) => {
      toast.success("Status updated!", { duration: 1500 });
      updateStatusLocal(status);
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to update");
    },
  });

  return mutation;
}

type UserField = keyof Omit<User, "id" | "email">;

export const useFetchUserFields = (email: string) => {
  const { setUser, user } = useUserStore();

  const query = useQuery({
    queryKey: ["user", email],
    queryFn: async () => {
      const data = await getUserFields(email, ["status"] as UserField[]);
      setUser(data);
      return data;
    },
  });

  return { user, ...query };
};
