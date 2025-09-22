"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function ConnectionsTabs() {
  const pathname = usePathname();

  const tabs = [
    {
      label: "Mutual Friends",
      href: "/dashboard/discover/friends/mutualfriends",
    },
    { label: "Following", href: "/dashboard/discover/friends/following" },
    { label: "Followers", href: "/dashboard/discover/friends/followers" },
  ];

  return (
    <div className="flex flex-wrap sm:flex-nowrap gap-2">
      {tabs.map((tab) => {
        const isActive = pathname === tab.href;
        return (
          <Link key={tab.href} href={tab.href}>
            <div
              className={`px-4 py-2 cursor-pointer rounded-t-lg transition-colors ${
                isActive
                  ? "bg-white font-semibold shadow dark:bg-gray-800"
                  : "text-gray-600 hover:text-gray-500"
              }`}
            >
              {tab.label}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
