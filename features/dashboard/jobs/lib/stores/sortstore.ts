import { create } from "zustand";

interface JobSortStore {
  sort: string;
  setSort: (value: string) => void;
}

export const useJobSortStore = create<JobSortStore>((set) => ({
  sort: "Newest",
  setSort: (value) => set({ sort: value }),
}));
