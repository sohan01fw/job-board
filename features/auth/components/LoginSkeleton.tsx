"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function LoginSkeleton() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* Left Side - Login Section */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 relative">
        {/* 🔔 Notice Bar (outside card, on top of left side only) */}
        <div className="w-full max-w-md text-center py-3 text-sm md:text-base font-medium mb-6">
          <Skeleton className="h-4 w-[90%] mx-auto" />
        </div>

        {/* Login Card */}
        <div className="max-w-sm w-full rounded-2xl border p-6 space-y-6">
          {/* Title */}
          <div className="space-y-3 text-center">
            <Skeleton className="h-6 w-48 mx-auto" />
            <Skeleton className="h-4 w-64 mx-auto" />
          </div>

          {/* Google Login */}
          <div className="flex justify-center">
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>

          {/* Divider */}
          <div className="flex items-center">
            <div className="flex-grow h-px bg-gray-200"></div>
            <span className="text-gray-400 text-sm mx-2">or</span>
            <div className="flex-grow h-px bg-gray-200"></div>
          </div>

          {/* Email Input + Button */}
          <div className="space-y-4">
            <Skeleton className="h-10 w-full rounded-md" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>

          {/* Message */}
          <div className="text-center">
            <Skeleton className="h-4 w-48 mx-auto" />
          </div>
        </div>
      </div>

      {/* Right Side - Illustration */}
      <div className="hidden md:flex flex-1 justify-center items-center">
        <div className="relative flex justify-center items-center w-full max-w-md h-[400px]">
          {/* Overlapping Images */}
          <div className="relative w-[300px] h-[300px]">
            <Skeleton className="absolute top-0 left-0 w-[300px] h-[300px] rounded-xl rotate-[-6deg] translate-x-4 translate-y-2 z-10" />
            <Skeleton className="absolute top-0 left-0 w-[300px] h-[300px] rounded-xl rotate-[5deg] -translate-x-4 -translate-y-3 opacity-90" />
          </div>
        </div>

        <div className="text-center px-6 mt-8 max-w-md space-y-3">
          <Skeleton className="h-6 w-60 mx-auto" />
          <Skeleton className="h-4 w-72 mx-auto" />
        </div>
      </div>
    </div>
  );
}
