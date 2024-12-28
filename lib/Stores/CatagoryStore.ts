import { create } from "zustand";

type CatagoryState = {
  category: string[];
  addCatagory: (category: string[]) => void;
};

export const useCatagoryStore = create<CatagoryState>((set) => ({
  category: [],
  addCatagory: (category) => {
    const sameItem = category.filter((item) => item !== "");
    set((state) => ({ category: sameItem }));
  },
}));

type LoadingState = {
  loading: boolean;
  addLoading: (load: Boolean) => void;
};

export const useLoadingStore = create<LoadingState>((set) => ({
  loading: false,
  addLoading: (load) => {
    console.log(load);
    // set((state)=> ({loading:load}))
  },
}));
