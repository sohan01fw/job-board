"use client";

import { Loader2 } from "lucide-react";

export default function SpinnerLoading() {
  return (
    <div className="flex items-center justify-center h-[100vh] w-full bg-white dark:bg-gray-900">
      <Loader2 className="w-8 h-8 text-green-600 animate-spin" />
    </div>
  );
}
