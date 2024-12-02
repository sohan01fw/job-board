/*
  Warnings:

  - Added the required column `jobCatagory` to the `JobApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jobLoc` to the `JobApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jobType` to the `JobApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `links` to the `JobApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salary` to the `JobApplication` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "JobType" AS ENUM ('PARTTIME', 'FULLTIME', 'CONTRACT');

-- CreateEnum
CREATE TYPE "JobLoc" AS ENUM ('REMOTE', 'ONSITE', 'HYBRID');

-- CreateEnum
CREATE TYPE "JobCatagory" AS ENUM ('FINANCE', 'MARKETING', 'IT');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- AlterTable
ALTER TABLE "JobApplication" ADD COLUMN     "jobCatagory" "JobCatagory" NOT NULL,
ADD COLUMN     "jobLoc" "JobLoc" NOT NULL,
ADD COLUMN     "jobType" "JobType" NOT NULL,
ADD COLUMN     "links" TEXT NOT NULL,
ADD COLUMN     "salary" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "JobForm" (
    "id" TEXT NOT NULL,
    "fname" VARCHAR(255) NOT NULL,
    "lname" VARCHAR(255) NOT NULL,
    "age" INTEGER NOT NULL,
    "gender" "Gender" NOT NULL,
    "about" TEXT NOT NULL,
    "resume" BYTEA NOT NULL,
    "socialLinks" TEXT[],
    "jobType" "JobType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "JobForm_pkey" PRIMARY KEY ("id")
);
