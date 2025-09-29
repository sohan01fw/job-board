import { create } from "zustand";

interface JobStore {
  jobId: string | null;
  setJobId: (id: string) => void;
  clearJobId: () => void;
}

export const useJobStore = create<JobStore>((set) => ({
  jobId: null,
  setJobId: (id: string) => set({ jobId: id }),
  clearJobId: () => set({ jobId: null }),
}));
