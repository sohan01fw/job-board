import { prisma } from "@/lib/Prisma";
import { withTryCatch } from "@/lib/tryCatch";
import { JobData } from "../../types";

export async function CreateJobPost(job: JobData, email: string) {
  return withTryCatch(async () => {
    return prisma.jobPost.create({
      data: {
        ...job,
        user: { connect: { email } },
      },
    });
  }, "Error while creating job post");
}

export async function getAllJobPosts({
  sort,
  filter,
  userId,
}: {
  sort?: string;
  filter?: string;
  userId?: string;
}) {
  return withTryCatch(async () => {
    // Default sorting
    let orderBy: any = { createdAt: "desc" };

    switch (sort) {
      case "Newest":
        orderBy = { createdAt: "desc" };
        break;
      case "Oldest":
        orderBy = { createdAt: "asc" };
        break;
    }

    // Fetch jobs including jobApplications count
    const data = await prisma.jobPost.findMany({
      where: { userId },
      include: {
        _count: {
          select: {
            jobApplications: true,
          },
        },
      },
      orderBy,
    });

    // Apply applicant filter
    const result = data.filter((job) => {
      if (!filter) return true;
      if (filter === "hasApplicants") return job._count.jobApplications > 0;
      if (filter === "noApplicants") return job._count.jobApplications === 0;
      return true;
    });

    return result;
  }, "Error while getting jobs");
}

//get all applicants for a job
export async function getAllApplications({ jobId }: { jobId: string }) {
  return withTryCatch(async () => {
    const result = await prisma.jobApplication.findMany({
      where: {
        jobId,
      },
    });

    return result;
  }, "Error while getting applicants");
}

//get all applicants for a job

// Get all applicants for a specific job
export async function getAllApplicantsByJob({ jobId }: { jobId: string }) {
  return withTryCatch(async () => {
    const applicants = await prisma.jobApplication.findMany({
      where: { jobId }, // filter by jobId
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true, // include applicant/user info if you have a relation
      },
    });
    return applicants;
  }, "Error while getting applicants for the job");
}

//update status

export async function updateJobApplicationStatus({
  applicationId,
  status,
}: {
  applicationId: string;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
}) {
  return withTryCatch(async () => {
    const updatedApp = await prisma.jobApplication.update({
      where: { id: applicationId },
      data: { status },
      include: {
        user: true,
        job: true,
      },
    });

    // 2️⃣ Create a notification for the applicant
    await prisma.notification.create({
      data: {
        userId: updatedApp.userId,
        jobApplicationId: updatedApp.id,
        message: `Your application for ${updatedApp.job.title} is now ${status}`,
      },
    });
    return updatedApp;
  }, "Error while updating job application status");
}
