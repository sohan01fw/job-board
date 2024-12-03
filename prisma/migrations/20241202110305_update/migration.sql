/*
  Warnings:

  - Added the required column `jobformId` to the `JobApplication` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "JobApplication" ADD COLUMN     "jobformId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "JobApplication" ADD CONSTRAINT "JobApplication_jobformId_fkey" FOREIGN KEY ("jobformId") REFERENCES "JobForm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
