import { Gender, JobCategory, JobLoc, JobType } from "@prisma/client";
import { z } from "zod";

export const jobCatagoryFormSchema = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
});
export const jobCreateSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  desc: z
    .string()
    .min(20, { message: "Description at least 20 characters long" }),

  requirements: z
    .array(z.string().min(1)) // ensures that the array contains non-empty strings
    .max(7, { message: "You can select up to 7 requirements only." }),

  salary: z.number().optional(),
  joblimit: z.number().max(100),
  jobType: z.nativeEnum(JobType),
  jobLoc: z.nativeEnum(JobLoc),
  jobCategory: z.nativeEnum(JobCategory),
  gender: z.nativeEnum(Gender),
  Links: z.string().optional().nullable(),
});
