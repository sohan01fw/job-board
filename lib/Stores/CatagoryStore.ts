import { create } from "zustand";

type CatagoryState = {
  category: string[];
  addCatagory: (category: string[]) => void;
};

export const useCatagoryStore = create<CatagoryState>((set) => ({
  category: [],
  addCatagory: (category) => {
    const sameItem = category.filter((item) => item !== "");
    set(() => ({ category: sameItem }));
  },
}));
