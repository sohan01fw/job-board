"use server";
import { ApplyJobSchemaType } from "@/types/Forms";
import { prisma } from "../Prisma";
import { GetAllFile, uploadFile } from "./FileAction";

export async function UpdateJobApplicationAppplied(jobAppId: string) {
  try {
    let inc = 1;
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
    await UpdateJobApplicationAppplied(jobFormId);
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
