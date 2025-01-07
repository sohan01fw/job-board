"use server";
import { funcResponse } from "@/types/global";
import { prisma } from "../Prisma";

export async function TotalJobCount(): Promise<funcResponse> {
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

export async function TotalApplicantCount(): Promise<funcResponse> {
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
