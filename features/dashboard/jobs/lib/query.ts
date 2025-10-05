import { prisma } from "@/lib/Prisma";
import { withTryCatch } from "@/lib/tryCatch";

// query.ts
export async function getAllJobs({
  sort,
  filter,
  search,
  user,
  cursor,
  limit = 3,
}: {
  sort?: string;
  filter?: string[];
  search?: string;
  user: any;
  cursor?: string;
  limit?: number;
}) {
  return withTryCatch(async () => {
    let orderBy: any = { createdAt: "desc" };

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
    if (filter?.includes("fulltime")) where.jobType = "fulltime";
    if (filter?.includes("Internship")) where.jobType = "internship";

    if (search && search.trim() !== "") {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { location: { contains: search, mode: "insensitive" } },
        { skills: { has: search } },
      ];
    }

    const data = await prisma.jobPost.findMany({
      take: limit + 1, // +1 to check if there’s a next page
      ...(cursor ? { skip: 1, cursor: { id: cursor } } : {}),
      where,
      orderBy,
      include: {
        jobApplications: { where: { userId: user.id } },
      },
    });

    const hasNextPage = data.length > limit;
    const jobs = hasNextPage ? data.slice(0, -1) : data;

    return {
      jobs: jobs.map((job) => ({
        ...job,
        applied: job.jobApplications.length > 0,
      })),
      nextCursor: hasNextPage ? data[data.length - 1].id : undefined,
    };
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
