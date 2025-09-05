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

export async function getAllJobPosts({ userId }: { userId?: string }) {
  return withTryCatch(async () => {
    const result = await prisma.jobPost.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        _count: {
          select: {
            jobApplications: true,
          },
        },
      },
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
