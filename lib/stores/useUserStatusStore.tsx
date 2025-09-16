// stores/userStore.ts
import { Status, User } from "@prisma/client";
import { create } from "zustand";

type UserState = {
  user: Partial<User>;
  setUser: (user: any) => void;
  updateStatusLocal: (status: Status) => void;
};

export const useUserStore = create<UserState>((set) => ({
  user: {},
  setUser: (user) => set({ user }),
  updateStatusLocal: (status) =>
    set((state) => ({
      user: { ...state.user, status },
    })),
}));
