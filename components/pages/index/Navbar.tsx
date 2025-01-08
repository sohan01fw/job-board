"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Briefcase, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RolePicker } from "./RolePicker";

const navigation = [
  { name: "Find Jobs", href: "/jobs" },
  { name: "Companies", href: "/companies" },
  { name: "Resources", href: "/resources" },
  { name: "Blog", href: "/blog" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center">
                <Briefcase className="h-8 w-8 text-primary" />
                <span className="ml-2 text-2xl font-bold text-primary">
                  JobBoard
                </span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    pathname === item.href
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <RolePicker />
          </div>
          <div className="flex items-center sm:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-screen">
                {navigation.map((item) => (
                  <DropdownMenuItem key={item.name} asChild>
                    <Link
                      href={item.href}
                      className={pathname === item.href ? "text-primary" : ""}
                    >
                      {item.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <div></div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}
