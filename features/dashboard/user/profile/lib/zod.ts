import z from "zod";

const profileSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  location: z.string().min(2, "Location is required"),
  title: z.string().min(2, "Job title is required"),
  experience: z.string().min(1, "Please select your experience level"),
  education: z.string().optional(),
  bio: z.string().min(50, "Bio must be at least 50 characters"),
  skills: z.array(z.string()).min(1, "Please add at least one skill"),
  website: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),
  linkedin: z.string().optional(),
  github: z.string().optional(),
  jobType: z.array(z.string()).min(1, "Please select at least one job type"),
  salaryRange: z.string().optional(),
  remote: z.boolean(),
  relocate: z.boolean(),
  profileImage: z.string().optional(),
  resume: z.string().optional(),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
export { profileSchema };
