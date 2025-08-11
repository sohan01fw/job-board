import { Gender } from "@prisma/client";
import z from "zod";

export const jobCatagoryFormSchema = z.object({
  items: z.string().min(1, {
    message: "You have to select at least one item.",
  }),
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
