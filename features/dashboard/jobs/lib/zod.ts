import { z } from "zod";

export const applicationSchema = z.object({
  coverLetter: z
    .string()
    .min(50, "Cover letter must be at least 50 characters"),
});
