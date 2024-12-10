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

export const applyJobSchema = z.object({
  fname: z.string().min(2, { message: "fname must be at least 2 characters." }),
  lname: z.string().min(2, { message: "lname must be at least 2 characters." }),
  about: z
    .string()
    .min(20, { message: "Description at least 20 characters long" }),
  sociallinks: z.array(z.string()).optional(),
  age: z.number().optional(),
  gender: z.nativeEnum(Gender),
  resume: z.custom<File | undefined>(
    (file) =>
      file === undefined ||
      (file instanceof File &&
        file.size <= 5 * 1024 * 1024 &&
        file.type === "application/pdf"),
    {
      message: "Resume must be a PDF file less than 5MB.",
    },
  ),
});
