"use client";

import { Briefcase, User } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";

export function JobSeekerCard() {
  const navigate = useRouter();
  const handleJobSeeker = () => {
    navigate.push("/auth/onboarding/profile");
  };
  return (
    <Card
      onClick={handleJobSeeker}
      className="cursor-pointer hover:shadow-lg transition rounded-xl border border-gray-200 p-4"
    >
      <CardHeader className="flex flex-col items-center text-center">
        <User className="w-12 h-12 mb-3 text-blue-500" />
        <CardTitle className="text-lg font-semibold">Job Seeker</CardTitle>
        <CardDescription>
          Find your dream job and build your career.
        </CardDescription>
      </CardHeader>
    </Card>
  );
}

export function RecruiterCard() {
  const navigate = useRouter();
  const handleRecruiter = () => {
    navigate.push("/auth/onboarding/company");
  };
  return (
    <Card
      onClick={handleRecruiter}
      className="cursor-pointer hover:shadow-lg transition rounded-xl border border-gray-200 p-4"
    >
      <CardHeader className="flex flex-col items-center text-center">
        <Briefcase className="w-12 h-12 mb-3 text-green-500" />
        <CardTitle className="text-lg font-semibold">Recruiter</CardTitle>
        <CardDescription>Post jobs and hire the best talent.</CardDescription>
      </CardHeader>
    </Card>
  );
}
