// store/profileStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ProfileStore {
  profileCompletion: number;
  setProfileCompletion: (value: number) => void;
  reset: () => void;
}

export const useProfileStore = create<ProfileStore>()(
  persist(
    (set) => ({
      profileCompletion: 20,
      setProfileCompletion: (value) => set({ profileCompletion: value }),
      reset: () => set({ profileCompletion: 20 }),
    }),
    {
      name: "profile-storage",
    },
  ),
);
