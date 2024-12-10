import { applyJobSchema, jobCreateSchema } from "@/lib/zod/Form";
import { Gender, JobCategory, JobLoc, JobType } from "@prisma/client";
import { z } from "zod";

export interface JobApp {
  title: string;
  desc: string;
  jobCategory: JobCategory;
  jobLoc: JobLoc;
  jobType: JobType;
  joblimit?: number;
  requirements: string[];
  salary?: number;
  gender: Gender;
  Links?: string;
}

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
export type ApplyJobSchemaType = {
  about: string;
  fname: string;
  lname: string;
  gender: "MALE" | "FEMALE";
  sociallinks?: string[] | undefined;
  age?: number | undefined;
  resume: File | undefined;
};

//for job specifically
export type JobData = {
  id: string;
  title: string;
  desc: string;
  status: boolean;
  requirements: string[];
  salary: number | null;
  joblimit: number | null; // Allow null here
  jobType: JobType;
  jobLoc: JobLoc;
  jobCategory: JobCategory;
  links: string | null;
  applied: number | null;
  createdAt: Date;
};
export type GetJobs =
  | {
      status: number;
      message: string;
      data?: undefined;
      error?: undefined;
    }
  | {
      data: {
        id: string;
        title: string;
        desc: string;
        status: boolean;
        requirements: string[];
        salary: number | null;
        joblimit: number | null; // Allow null here
        jobType: JobType;
        jobLoc: JobLoc;
        jobCategory: JobCategory;
        links: string | null;
        applied: number | null;
        createdAt: Date;
      }[];
    };
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
