import { jobCreateSchema } from "@/lib/zod/Form";
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
//For User
export interface User {
  id: string;
  email: string;
  name?: string;
}