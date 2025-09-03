-- CreateEnum
CREATE TYPE "public"."WorkType" AS ENUM ('remote', 'hybrid', 'onsite');

-- CreateEnum
CREATE TYPE "public"."JobType" AS ENUM ('full_time', 'part_time', 'contract', 'internship');

-- CreateEnum
CREATE TYPE "public"."Experience" AS ENUM ('entry', 'mid', 'senior', 'executive');

-- CreateEnum
CREATE TYPE "public"."Status" AS ENUM ('IDLE', 'OPENTOWORK', 'HIRING');

-- CreateTable
CREATE TABLE "public"."JobPost" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "workType" "public"."WorkType" NOT NULL,
    "jobType" "public"."JobType" NOT NULL,
    "experience" "public"."Experience" NOT NULL,
    "salaryMin" TEXT NOT NULL,
    "salaryMax" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "requirements" TEXT[],
    "benefits" TEXT[],
    "skills" TEXT[],
    "applicationDeadline" TIMESTAMP(3) NOT NULL,
    "contactEmail" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "JobPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255),
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "location" TEXT,
    "title" TEXT,
    "experience" TEXT,
    "education" TEXT,
    "bio" TEXT,
    "skills" TEXT[],
    "website" TEXT,
    "linkedin" TEXT,
    "github" TEXT,
    "jobType" TEXT[],
    "salaryRange" TEXT,
    "remote" BOOLEAN NOT NULL DEFAULT false,
    "relocate" BOOLEAN NOT NULL DEFAULT false,
    "img" TEXT,
    "resume" TEXT,
    "status" "public"."Status" NOT NULL DEFAULT 'IDLE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "public"."User"("phone");

-- AddForeignKey
ALTER TABLE "public"."JobPost" ADD CONSTRAINT "JobPost_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
