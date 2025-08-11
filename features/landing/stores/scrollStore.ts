"use client";

import { create } from "zustand";

type ScrollStore = {
  sections: Record<string, HTMLElement | null>;
  register: (key: string, el: HTMLElement | null) => void;
  scrollTo: (key: string) => void;
};

export const useScrollStore = create<ScrollStore>((set, get) => ({
  sections: {},
  register: (key, el) =>
    set((s) => ({ sections: { ...s.sections, [key]: el } })),
  scrollTo: (key) => {
    const el = get().sections[key];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      // fallback: try element by id
      const fallback = document.getElementById(key);
      fallback?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  },
}));
