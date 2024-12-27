"use server";
import { CreateJobResponse, GetJobs, JobApp } from "@/types/Forms";
import { prisma } from "../Prisma";
import { CheckUser } from "./Users";
import { JobCategory } from "@prisma/client";

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

export async function GetAllJobs(filterData: string[]): Promise<GetJobs> {
  try {
    // Make sure to map the strings to JobCategory enum values if necessary
    const jobCategories = filterData.map(
      (category) => JobCategory[category as keyof typeof JobCategory],
    );

    // Now use the array in the Prisma query
    const jobs = await prisma.jobApplication.findMany({
      where:
        jobCategories.length > 0
          ? {
              jobCategory: {
                in: jobCategories, // Pass array of enum values
              },
            }
          : {},
    });

    if (!jobs) {
      return {
        status: 404,
        message: "No job add the moment!",
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
