import { toast } from "sonner";
import { UpdateUserProfile } from "../actions";
import { User } from "@prisma/client";
import { useLoading } from "@/lib/Hooks/useLoading";

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
      const result = await UpdateUserProfile(email, filteredData);
      toast.success("Profile updated successfully!", {
        duration: 1500,
        position: "top-right",
      });
      return result;
    });

  return { updateUser, loading };
};
