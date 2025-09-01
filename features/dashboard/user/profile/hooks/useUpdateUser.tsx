import { toast } from "sonner";
import { getUserFields, UpdateUserProfile } from "../actions";
import { Status, User } from "@prisma/client";
import { useLoading } from "@/lib/Hooks/useLoading";
import { useState } from "react";

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

export const useUpdateStatus = () => {
  const { loading, withLoading } = useLoading();

  const updateStatus = ({ email, status }: { email: string; status: Status }) =>
    withLoading(async () => {
      const result = await UpdateUserProfile(email, { status });
      toast.success("Status updated!", {
        duration: 1500,
        position: "bottom-right",
      });
      return result;
    });

  return { updateStatus, loading };
};

type UserField = keyof Omit<User, "id" | "email">;

export const useFetchUserFields = ({ email }: { email: string }) => {
  const { loading, withLoading } = useLoading();
  const [data, setData] = useState<Partial<User>>({});

  const fetchFields = ({ fields }: { fields: UserField | UserField[] }) =>
    withLoading(async () => {
      try {
        const result = await getUserFields(email, fields);
        setData(result || {});
        return result;
      } catch (err: any) {
        toast.error(err.message || "Fetch failed", { duration: 1500 });
        throw err;
      }
    });

  return { fetchFields, data, loading };
};
