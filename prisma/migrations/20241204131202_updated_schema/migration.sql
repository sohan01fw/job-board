/*
  Warnings:

  - You are about to drop the column `jobCatagory` on the `JobApplication` table. All the data in the column will be lost.
  - You are about to drop the column `jobformId` on the `JobApplication` table. All the data in the column will be lost.
  - Added the required column `jobCategory` to the `JobApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jobApplicationId` to the `JobForm` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "JobCategory" AS ENUM ('FINANCE', 'MARKETING', 'IT');

-- DropForeignKey
ALTER TABLE "JobApplication" DROP CONSTRAINT "JobApplication_jobformId_fkey";

-- AlterTable
ALTER TABLE "JobApplication" DROP COLUMN "jobCatagory",
DROP COLUMN "jobformId",
ADD COLUMN     "jobCategory" "JobCategory" NOT NULL,
ALTER COLUMN "joblimit" DROP NOT NULL,
ALTER COLUMN "joblimit" SET DEFAULT 99,
ALTER COLUMN "applied" DROP NOT NULL,
ALTER COLUMN "applied" SET DEFAULT 0,
ALTER COLUMN "status" SET DEFAULT true,
ALTER COLUMN "links" DROP NOT NULL,
ALTER COLUMN "salary" DROP NOT NULL;

-- AlterTable
ALTER TABLE "JobForm" ADD COLUMN     "jobApplicationId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "name" DROP NOT NULL;

-- DropEnum
DROP TYPE "JobCatagory";

-- AddForeignKey
ALTER TABLE "JobForm" ADD CONSTRAINT "JobForm_jobApplicationId_fkey" FOREIGN KEY ("jobApplicationId") REFERENCES "JobApplication"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
