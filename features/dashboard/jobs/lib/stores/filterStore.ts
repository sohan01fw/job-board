import { create } from "zustand";

interface JobFilterStore {
  filter: string[];
  setFilter: (value: string[]) => void;
}

export const useJobFilterStore = create<JobFilterStore>((set) => ({
  filter: [],
  setFilter: (value) => set({ filter: value }),
}));
