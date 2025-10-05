// lib/stores/searchStore.ts
import { create } from "zustand";

interface JobSearchState {
  search: string;
  setSearch: (val: string) => void;
}

export const useJobSearchStore = create<JobSearchState>((set) => ({
  search: "",
  setSearch: (val) => set({ search: val }),
}));
