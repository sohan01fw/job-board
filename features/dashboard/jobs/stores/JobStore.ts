import { create } from "zustand";
import { JobData } from "../types";

type JobState = {
  job: JobData | null;
  setJob: (item: JobData) => void;
};

export const useJobStore = create<JobState>((set) => ({
  job: null,
  setJob: (item) => set(() => ({ job: item })),
}));
