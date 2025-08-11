import { Gender, JobCategory, JobLoc, JobType } from "@prisma/client";

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
