import { create } from "zustand";

type CatagoryState = {
  category: string;
  addCatagory: (item: string) => void;
};

export const useCatagoryStore = create<CatagoryState>((set) => ({
  category: "",
  addCatagory: (item) => {
    set(() => ({ category: item }));
  },
}));
