import { create } from "zustand";
import { JobData } from "../../types";

interface JobPostStore {
  jobData: JobData;
  updateField: (field: keyof JobData, value: any) => void;
  updateMinSalary: (value: number) => void;
  updateMaxSalary: (value: number) => void;
  updateCurrency: (currency: string) => void;
  addRequirement: (requirement: string) => void;
  removeRequirement: (index: number) => void;
  addBenefit: (benefit: string) => void;
  removeBenefit: (index: number) => void;
  addSkill: (skill: string) => void;
  removeSkill: (index: number) => void;
  resetForm: () => void;
}

const initialJobData: JobData = {
  title: "",
  company: "",
  location: "",
  workType: "remote",
  jobType: "fulltime",
  experience: "mid",
  minSalary: 0,
  maxSalary: 0,
  currency: "USD", // TODO: make this dynamic
  description: "",
  requirements: [],
  benefits: [],
  skills: [],
  applicationDeadline: "",
  contactEmail: "",
};

export const useJobPostStore = create<JobPostStore>((set) => ({
  jobData: initialJobData,

  updateField: (field, value) =>
    set((state) => ({
      jobData: { ...state.jobData, [field]: value },
    })),

  updateMinSalary: (value) =>
    set((state) => ({
      jobData: {
        ...state.jobData,
        minSalary: value,
      },
    })),

  updateMaxSalary: (value) =>
    set((state) => ({
      jobData: {
        ...state.jobData,
        maxSalary: value,
      },
    })),
  updateCurrency: (currency) =>
    set((state) => ({
      jobData: {
        ...state.jobData,
        currency,
      },
    })),

  addRequirement: (requirement) =>
    set((state) => ({
      jobData: {
        ...state.jobData,
        requirements: [...state.jobData.requirements, requirement],
      },
    })),

  removeRequirement: (index) =>
    set((state) => ({
      jobData: {
        ...state.jobData,
        requirements: state.jobData.requirements.filter((_, i) => i !== index),
      },
    })),

  addBenefit: (benefit) =>
    set((state) => ({
      jobData: {
        ...state.jobData,
        benefits: [...state.jobData.benefits, benefit],
      },
    })),

  removeBenefit: (index) =>
    set((state) => ({
      jobData: {
        ...state.jobData,
        benefits: state.jobData.benefits.filter((_, i) => i !== index),
      },
    })),

  addSkill: (skill) =>
    set((state) => ({
      jobData: {
        ...state.jobData,
        skills: [...state.jobData.skills, skill],
      },
    })),

  removeSkill: (index) =>
    set((state) => ({
      jobData: {
        ...state.jobData,
        skills: state.jobData.skills.filter((_, i) => i !== index),
      },
    })),

  resetForm: () => set({ jobData: initialJobData }),
}));
