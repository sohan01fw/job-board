import { revalidateTag } from "next/cache";
import { JobApp } from "./types";
import { CheckUser } from "@/lib/Actions/Users";
import { prisma } from "@/lib/Prisma";

export async function CreateJobs(
  jobsAppData: JobApp,
  userEmail: string,
  userId: string,
): Promise<any> {
  try {
    const checkUser = await CheckUser(userEmail);

    if (!checkUser) {
      return {
        error: true,
        message: "user doesn't exist",
      };
    }
    const jobs = await prisma.jobApplication.create({
      data: {
        title: jobsAppData.title,
        desc: jobsAppData.desc,
        jobType: jobsAppData.jobType,
        jobLoc: jobsAppData.jobLoc,
        jobCategory: jobsAppData.jobCategory, // Adjust naming to match schema
        salary: jobsAppData.salary ?? 0,
        requirements: jobsAppData.requirements || [],
        links: jobsAppData.Links || null,
        joblimit: jobsAppData.joblimit,
        userId,
      },
    });

    return { error: false, ...jobs };
  } catch (error) {
    if (error) {
      return {
        error: true,
        message: "Error while posting jobs application",
      };
    }
  }
}

export async function DeleteJobs(jobId: string): Promise<any> {
  try {
    const jobs = await prisma.jobApplication.delete({
      where: {
        id: jobId,
      },
    });
    if (!jobs) {
      return {
        error: true,
        message: "problem in deleting job",
      };
    }

    revalidateTag("/dashboard/jobs");
    return { error: false, ...jobs };
  } catch (error) {
    if (error) {
      console.log(error);
      return {
        error: true,
        message: "Unexpected Error occur while deleting job application",
      };
    }
  }
}

export async function TotalJobCount(): Promise<any> {
  try {
    const totalJob = await prisma.jobApplication.groupBy({
      by: ["jobCategory"],
      _count: { id: true },
      where: { status: true },
    });
    if (!totalJob) {
      return {
        data: null,
        message: "no job found",
        status: 404,
      };
    }

    return {
      data: totalJob,
      status: 200,
      message: "success!",
    };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      error: true,
      message: "Unexpected error while counting total job",
      status: 500,
    };
  }
}

export async function TotalApplicantCount(): Promise<any> {
  try {
    const totalApplicant = await prisma.jobApplication.groupBy({
      by: ["jobCategory"],
      _sum: {
        applied: true,
      },
    });

    if (!totalApplicant) {
      return {
        data: null,
        message: "no job found",
        status: 404,
      };
    }

    return {
      data: totalApplicant,
      status: 200,
      message: "success!",
    };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      error: true,
      message: "Unexpected error while counting total job",
      status: 500,
    };
  }
}
