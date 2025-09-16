import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ProfileStore {
  profileCompletion: number;
  setProfileCompletion: (value: number) => void;
}

export const useProfileStore = create<ProfileStore>()(
  persist(
    (set) => ({
      profileCompletion: 20,
      setProfileCompletion: (value) => set({ profileCompletion: value }),
    }),
    {
      name: "profile-storage", // key in localStorage
    },
  ),
);
