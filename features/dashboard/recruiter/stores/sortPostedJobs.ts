import { create } from "zustand";

interface PostedJobSortStore {
  sort: string;
  setSort: (value: string) => void;
}

export const usePostedJobSortStore = create<PostedJobSortStore>((set) => ({
  sort: "Newest",
  setSort: (value) => set({ sort: value }),
}));
