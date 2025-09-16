import { create } from "zustand";

interface PostedJobsFilterStore {
  filter: string;
  setFilter: (value: string) => void;
}

export const usePostedJobsFilterStore = create<PostedJobsFilterStore>(
  (set) => ({
    filter: "",
    setFilter: (value) => set({ filter: value }),
  }),
);
