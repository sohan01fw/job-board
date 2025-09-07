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
