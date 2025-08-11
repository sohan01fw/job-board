import {
  JobSeekerCard,
  RecruiterCard,
} from "@/features/auth/components/RoleCard";

export default function Onboarding() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-center mb-8">
          Choose your role
        </h1>
        <div className="grid gap-6 sm:grid-cols-2">
          {/* Job Seeker */}
          <JobSeekerCard />
          {/* Recruiter */}
          <RecruiterCard />
        </div>
      </div>
    </div>
  );
}
