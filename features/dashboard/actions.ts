import { CheckUser } from "@/lib/Actions/Users";
import { prisma } from "@/lib/Prisma";
import { withTryCatch } from "@/lib/tryCatch";
import { JobApp } from "./types";
import { revalidateTag } from "next/cache";

export async function CreateJobs(
  jobsAppData: JobApp,
  userEmail: string,
  userId: string,
) {
  return withTryCatch(async () => {
    const checkUser = await CheckUser(userEmail);
    if (!checkUser) throw new Error("user doesn't exist");

    return await prisma.jobApplication.create({
      data: {
        title: jobsAppData.title,
        desc: jobsAppData.desc,
        jobType: jobsAppData.jobType,
        jobLoc: jobsAppData.jobLoc,
        jobCategory: jobsAppData.jobCategory,
        salary: jobsAppData.salary ?? 0,
        requirements: jobsAppData.requirements || [],
        links: jobsAppData.Links || null,
        joblimit: jobsAppData.joblimit,
        userId,
      },
    });
  }, "Error while posting jobs application");
}

export async function DeleteJobs(jobId: string) {
  return withTryCatch(async () => {
    const jobs = await prisma.jobApplication.delete({ where: { id: jobId } });
    revalidateTag("/dashboard/jobs");
    return jobs;
  }, "Unexpected error while deleting job application");
}

export async function TotalJobCount() {
  return withTryCatch(async () => {
    return await prisma.jobApplication.groupBy({
      by: ["jobCategory"],
      _count: { id: true },
      where: { status: true },
    });
  }, "Unexpected error while counting total job");
}

export async function TotalApplicantCount() {
  return withTryCatch(async () => {
    return await prisma.jobApplication.groupBy({
      by: ["jobCategory"],
      _sum: { applied: true },
    });
  }, "Unexpected error while counting applicants");
}
