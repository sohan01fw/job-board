import z from "zod";

const profileSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),

  phone: z.string().refine((val) => val === "" || val.length >= 10, {
    message: "Please enter a valid phone number",
  }),

  location: z.string().refine((val) => val === "" || val.length >= 2, {
    message: "Location is required",
  }),

  title: z.string().refine((val) => val === "" || val.length >= 2, {
    message: "Job title is required min 2 characters",
  }),

  experience: z.string().refine((val) => val === "" || val.length >= 1, {
    message: "Please select your experience level",
  }),

  education: z.string().optional(),

  bio: z.string().refine((val) => val === "" || val.length >= 50, {
    message: "Bio must be at least 50 characters",
  }),

  skills: z
    .array(z.string())
    .refine((val) => val.length === 0 || val.length >= 1, {
      message: "Please add at least one skill",
    }),

  website: z
    .string()
    .refine((val) => val === "" || /^https?:\/\/[^\s$.?#].[^\s]*$/.test(val), {
      message: "Please enter a valid URL",
    }),

  linkedin: z.string().refine((val) => val === "" || val.startsWith("http"), {
    message: "Please enter a valid LinkedIn URL",
  }),

  github: z.string().refine((val) => val === "" || val.startsWith("http"), {
    message: "Please enter a valid GitHub URL",
  }),

  jobType: z
    .array(z.string())
    .refine((val) => val.length === 0 || val.length >= 1, {
      message: "Please select at least one job type",
    }),

  salaryRange: z.string().optional(),
  remote: z.boolean(),
  relocate: z.boolean(),
  profileImage: z.string().optional(),
  resume: z.string().optional(),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
export { profileSchema };
