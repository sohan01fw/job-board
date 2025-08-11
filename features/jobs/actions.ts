"use server";
import { prisma } from "@/lib/Prisma";
import { CreateJobResponse } from "@/types/Forms";
import { JobCategory } from "@prisma/client";
import { ApplyJobSchemaType, GetJobs } from "./types";
import { GetAllFile, uploadFile } from "@/lib/Actions/FileUpload";

// this is for form post
export async function PostJobsForm(
  jobsFormData: ApplyJobSchemaType,
  jobFormId: string,
) {
  try {
    const resumefile = jobsFormData.resume;
    const bname = "resume";
    //upload file to file storage
    const uploadpdfFile = await uploadFile(resumefile, bname);
    if ("error" in uploadpdfFile) {
      console.log(uploadpdfFile.message);
    }
    //get the file link
    const getFileLink = await GetAllFile(resumefile, bname);
    if ("error" in getFileLink) {
      console.log(getFileLink.message);
    }
    const jobForm = await prisma.jobForm.create({
      data: {
        fname: jobsFormData.fname,
        lname: jobsFormData.lname,
        about: jobsFormData.about,
        age: jobsFormData.age,
        gender: jobsFormData.gender,
        socialLinks: jobsFormData.sociallinks,
        resume: getFileLink.data?.publicUrl || "", //need to upload file to storage first
        jobApplicationId: jobFormId,
      },
    });
    await UpdateJobApplicationApplied(jobFormId);
    return { error: false, ...jobForm };
  } catch (error) {
    if (error) {
      console.log(error);
      return {
        error: true,
        message: "Error while creating job form",
      };
    }
  }
}

export async function UpdateJobApplicationApplied(jobAppId: string) {
  try {
    const inc = 1;
    const appliedValue = await prisma.jobApplication.aggregate({
      _sum: { applied: true },
    });
    const jobForm = await prisma.jobApplication.update({
      where: {
        id: jobAppId,
      },
      data: {
        applied: (appliedValue._sum.applied || 0) + inc,
      },
    });
    return { error: false, ...jobForm };
  } catch (error) {
    if (error) {
      console.log(error);
      return {
        error: true,
        message: "Error while posting jobs application",
      };
    }
  }
}
export async function GetAllJobs(filterData: string): Promise<GetJobs> {
  try {
    const jobs = await prisma.jobApplication.findMany({
      where: filterData
        ? {
            jobCategory: filterData as JobCategory,
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
