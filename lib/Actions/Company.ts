"use server";

import { prisma } from "../Prisma";

export async function CheckCompany(userId: string) {
  try {
    // check user exists or not
    const checkCompany = await prisma.company.findUnique({
      where: {
        userId: userId,
      },
    });
    if (!checkCompany) {
      return {
        error: true,
        message: "user not found",
        status: 404,
      };
    }
    const companydata = {
      id: checkCompany.id,
      name: checkCompany.name,
      desc: checkCompany.desc,
    };
    return {
      data: companydata,
      message: "successfully get the company info",
      status: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      error: true,
      message: "Error while find the user",
      status: 500,
    };
  }
}
export async function PostCompanyInfo(
  name: string | undefined,
  desc: string | undefined,
  userId: string,
) {
  try {
    const checkCom = await CheckCompany(userId);
    if ("error" in checkCom) {
      const CreateCompanyInfo = await prisma.company.create({
        data: {
          name: name || "",
          desc: desc || "",
          userId: userId,
        },
      });
      if (!CreateCompanyInfo) {
        return {
          status: 401,
          message: "error while creating companyInfo",
        };
      }
      return {
        status: 200,
        message: "successfully create the company info",
      };
    }
    const UpdateCompanyInfo = await prisma.company.update({
      where: {
        name: name,
      },
      data: {
        name: name,
        desc: desc,
      },
    });
    if (!UpdateCompanyInfo) {
      return {
        status: 401,
        message: "error while updating companyInfo",
      };
    }
    return {
      status: 200,
      message: "successfully update the company info",
    };
  } catch (error) {
    return error;
  }
}
