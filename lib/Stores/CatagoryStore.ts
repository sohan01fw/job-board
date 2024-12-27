import { create } from "zustand";

type CounterState = {
  category: string[];
  addCatagory: (category: string[]) => void;
};

export const useCatagoryStore = create<CounterState>((set) => ({
  category: [],
  addCatagory: (category) => {
    const sameItem = category.filter((item) => item !== "");
    set((state) => ({ category: sameItem }));
  },
}));
