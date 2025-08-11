import { JobCategory, JobLoc, JobType } from "@prisma/client";

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
export type ApplyJobSchemaType = {
  about: string;
  fname: string;
  lname: string;
  gender: "MALE" | "FEMALE";
  sociallinks?: string[] | undefined;
  age?: number | undefined;
  resume: File | undefined;
};
