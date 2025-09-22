"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function DiscoverTabs() {
  const pathname = usePathname();

  const tabs = [
    { label: "Latest", href: "/dashboard/discover" },
    { label: "Friends", href: "/dashboard/discover/friends/mutualfriends" },
    { label: "Posts", href: "/dashboard/discover/posts" },
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
