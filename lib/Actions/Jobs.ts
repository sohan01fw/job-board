"use server";
import { CreateJobResponse, GetJobs, JobApp } from "@/types/Forms";
import { prisma } from "../Prisma";
import { CheckUser } from "./Users";
import { JobCategory } from "@prisma/client";
import { revalidateTag } from "next/cache";

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

      orderBy: {
        createdAt: "desc",
      },
    });

    if (!jobs) {
      return {
        status: 404,
        message: "No job at the moment!",
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

export async function DeleteJobs(jobId: string): Promise<CreateJobResponse> {
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

//get jobs for specific id
export async function getJobsFromId(jobId: string): Promise<CreateJobResponse> {
  try {
    const jobs = await prisma.jobApplication.findUnique({
      where: {
        id: jobId,
      },
      include: {
        jobForm: true,
      },
    });
    if (!jobs) {
      return {
        error: true,
        message: "problem in finding job",
      };
    }

    return { error: false, ...jobs };
  } catch (error) {
    if (error) {
      console.log(error);
      return {
        error: true,
        message: "Unexpected Error occur while job job application",
      };
    }
  }
}
