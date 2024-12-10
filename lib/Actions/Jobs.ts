"use server";
import { CreateJobResponse, GetJobs, JobApp } from "@/types/Forms";
import { prisma } from "../Prisma";
import { CheckUser } from "./Users";

export async function CreateJobs(
  jobsAppData: JobApp,
  userEmail: string,
  userId: string,
): Promise<CreateJobResponse> {
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

export async function GetAllJobs(): Promise<GetJobs> {
  try {
    const jobs = await prisma.jobApplication.findMany();
    if (!jobs) {
      return {
        status: 404,
        message: "job isn't found!",
      };
    }
    return {
      data: jobs,
    };
  } catch (error) {
    console.log(error);
    return {
      message: "unexpected error while finding jobs",
      status: 500,
    };
  }
}
