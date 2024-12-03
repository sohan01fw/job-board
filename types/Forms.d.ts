import { jobCreateSchema } from "@/lib/zod/Form";

// enum JobType {
//   PARTTIME = "partime",
//   FULLTIME = "fulltime",
//   CONTRACT = "contract",
// }
// enum JobLoc {
//   REMOTE = "remote",
//   ONSITE = "onsite",
//   HYBRID = "hybrid",
// }
// enum JobCatagory {
//   FINANCE = "finance",
//   MARKETING = "marketing",
//   IT = "it",
// }

export type JobAppSchemaType = z.infer<typeof jobCreateSchema>;
