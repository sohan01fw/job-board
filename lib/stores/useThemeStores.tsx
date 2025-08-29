import { create } from "zustand";

interface ThemeState {
  darkMode: boolean;
  toggle: () => void;
  setDarkMode: (value: boolean) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  darkMode:
    typeof window !== "undefined"
      ? localStorage.getItem("darkMode") === "true"
      : false,
  toggle: () =>
    set((state) => {
      const newValue = !state.darkMode;
      if (typeof window !== "undefined")
        localStorage.setItem("darkMode", newValue.toString());
      return { darkMode: newValue };
    }),
  setDarkMode: (value) => {
    if (typeof window !== "undefined")
      localStorage.setItem("darkMode", value.toString());
    set({ darkMode: value });
  },
}));
