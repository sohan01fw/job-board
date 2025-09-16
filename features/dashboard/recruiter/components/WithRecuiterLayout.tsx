"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function WithRecruiterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const tabs = [
    { label: "Post a Job", href: "/dashboard/recruiter/postjob" },
    { label: "Applicants", href: "/dashboard/recruiter/jobs" },
  ];

  return (
    <div className="m-5">
      <div className="flex flex-wrap sm:flex-nowrap border-b border-gray-300 mb-5">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;
          return (
            <Link key={tab.href} href={tab.href}>
              <div
                className={`px-4 py-2 cursor-pointer rounded-t-lg transition-colors ${
                  isActive
                    ? "bg-white text-blue-600 font-semibold shadow"
                    : "text-gray-600 hover:text-blue-500"
                }`}
              >
                {tab.label}
              </div>
            </Link>
          );
        })}
      </div>
      <div>{children}</div>
    </div>
  );
}
