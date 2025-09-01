import { create } from "zustand";

export interface JobPostData {
  title: string;
  company: string;
  location: string;
  workType: "remote" | "hybrid" | "onsite";
  jobType: "full-time" | "part-time" | "contract" | "internship";
  experience: "entry" | "mid" | "senior" | "executive";
  salary: {
    salaryMin: string;
    salaryMax: string;
    salaryCurrency: string;
  };
  description: string;
  requirements: string[];
  benefits: string[];
  skills: string[];
  applicationDeadline: string;
  contactEmail: string;
}

interface JobPostStore {
  jobData: JobPostData;
  updateField: (field: keyof JobPostData, value: any) => void;
  updateSalary: (field: keyof JobPostData["salary"], value: string) => void;
  addRequirement: (requirement: string) => void;
  removeRequirement: (index: number) => void;
  addBenefit: (benefit: string) => void;
  removeBenefit: (index: number) => void;
  addSkill: (skill: string) => void;
  removeSkill: (index: number) => void;
  resetForm: () => void;
}

const initialJobData: JobPostData = {
  title: "",
  company: "",
  location: "",
  workType: "remote",
  jobType: "full-time",
  experience: "mid",
  salary: {
    salaryMin: "",
    salaryMax: "",
    salaryCurrency: "USD", // TODO: make this dynamic
  },
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

  updateSalary: (field, value) =>
    set((state) => ({
      jobData: {
        ...state.jobData,
        salary: { ...state.jobData.salary, [field]: value },
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
