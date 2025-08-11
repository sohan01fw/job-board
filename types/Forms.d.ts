import { jobCreateSchema } from "@/lib/zod/Form";
import { JobCategory, JobLoc, JobType } from "@prisma/client";
import { z } from "zod";

export type CreateJobResponse =
  | {
      error: true;
      message: string;
    }
  | {
      error: false;
      title: string;
      desc: string;
      id: string;
      createdAt: Date;
      userId: string;
      status: boolean;
      requirements: string[];
      salary: number | null;
      joblimit: number | null;
      jobType: JobType;
      jobLoc: JobLoc;
      jobCategory: JobCategory;
      links: string | null;
      applied: number | null;
    }
  | undefined;
export type JobAppSchemaType = z.infer<typeof jobCreateSchema>;

//For User
export interface User {
  id: string;
  email: string;
  name?: string;
  img?: string;
}
export interface DataError {
  error: boolean;
  message: string;
  status: number;
}
export type CheckUserData =
  | { id: string; email: string }
  | {
      error: boolean;
      message: string;
      status: number;
    };
// Utility function to safely get keys
export const getKey = <K extends keyof User>(key: K): User[K] | undefined =>
  key in userData ? (userData as User)[key] : undefined;

export interface companyInfo {
  name?: string;
  desc?: string;
}
