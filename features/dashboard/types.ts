import { JobType } from "@prisma/client";

export interface JobData {
  title: string;
  company: string;
  location: string;
  workType: "remote" | "hybrid" | "onsite";
  jobType: JobType;
  experience: "entry" | "mid" | "senior" | "executive";
  minSalary: number;
  maxSalary: number;
  currency: string;
  description: string;
  requirements: string[];
  benefits: string[];
  skills: string[];
  applicationDeadline: string;
  contactEmail: string;
}
