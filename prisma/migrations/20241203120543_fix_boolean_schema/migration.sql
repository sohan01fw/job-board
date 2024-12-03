/*
  Warnings:

  - The `requirements` column on the `JobApplication` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "JobApplication" DROP COLUMN "requirements",
ADD COLUMN     "requirements" TEXT[];
