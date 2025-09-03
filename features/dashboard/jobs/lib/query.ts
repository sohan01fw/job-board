import { prisma } from "@/lib/Prisma";
import { withTryCatch } from "@/lib/tryCatch";

export async function getAllJobs({
  sort,
  filter,
}: {
  sort?: string;
  filter?: string[];
}) {
  return withTryCatch(async () => {
    let orderBy: any = { createdAt: "desc" }; // default

    switch (sort) {
      case "Newest":
        orderBy = { createdAt: "desc" };
        break;
      case "Oldest":
        orderBy = { createdAt: "asc" };
        break;
      case "Salary High → Low":
        orderBy = { minSalary: "desc" };
        break;
      case "Salary Low → High":
        orderBy = { minSalary: "asc" };
        break;
    }

    const where: any = {};

    if (filter?.includes("Remote only")) where.workType = "remote";
    if (filter?.includes("fulltime")) where.jobType = "fulltime"; // adjust to your enum
    if (filter?.includes("Internship")) where.jobType = "internship"; // adjust

    const data = await prisma.jobPost.findMany({
      where,
      orderBy,
    });

    return data;
  }, "Error while getting jobs");
}
