"use client";

import { useQuery } from "@tanstack/react-query";
import type { User } from "@prisma/client";
import { getAllUsersExceptAction } from "../action";

export function useAllUsersExcept(currentUserId: string) {
  return useQuery<User[]>({
    queryKey: ["suggestion-users", { exclude: currentUserId }],
    queryFn: () => getAllUsersExceptAction(currentUserId),
  });
}
