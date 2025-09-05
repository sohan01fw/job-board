import { prisma } from "@/lib/Prisma";
import { withTryCatch } from "@/lib/tryCatch";

export async function getAllJobs({
  sort,
  filter,
  user,
}: {
  sort?: string;
  filter?: string[];
  user: any;
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
      include: {
        jobApplications: {
          where: {
            userId: user.id,
          },
        },
      },
      where,
      orderBy,
    });
    // Add `applied` flag per job
    const result = data.map((job) => ({
      ...job,
      applied: job.jobApplications.length > 0,
    }));

    return result;
  }, "Error while getting jobs");
}

interface JobApplication {
  userId: string;
  jobId: string;
  coverLetter: string;
}

export async function ApplyJobApplication({
  userId,
  jobId,
  coverLetter,
}: JobApplication) {
  return withTryCatch(async () => {
    return prisma.jobApplication.create({
      data: { userId, jobId, coverLetter, status: "PENDING", viewed: false },
    });
  }, "Error while applying for job");
}
