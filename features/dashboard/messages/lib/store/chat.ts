// store/chat.ts
import { create } from "zustand";

interface ChatState {
  loading: boolean;
  setLoading: (value: boolean) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  loading: false,
  setLoading: (value: boolean) => set({ loading: value }),
}));
