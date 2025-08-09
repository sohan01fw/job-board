"use client";

import Link from "next/link";
// import { usePathname } from "next/navigation";
import { CheckCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/supabase_client";
// import { RolePicker } from "../lib/RolePicker";

// const navigation = [
//   { name: "Find Jobs", href: "/jobs" },
//   { name: "Blog", href: "/blogs" },
// ];

export function Navbar() {
  // const pathname = usePathname();
  const [setUser] = useState<any>(null);
  useEffect(() => {
    const user = async () => {
      const user = await supabase.auth.getUser();
      setUser(user.data.user);
    };
    user();
  }, []);

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 m-5">
      <div className="container mx-auto flex items-center justify-center ">
        <div className="bg-white shadow-lg flex items-center space-x-16 px-4 py-3 rounded-3xl">
          <Link href="/" className="flex items-center space-x-2">
            <CheckCircle className="h-6 w-6 text-green-500" />
            <span className="text-xl font-bold text-gray-900">JobBoard</span>
          </Link>
          <div className="hidden md:flex space-x-8">
            <Link
              href="/"
              className="text-gray-900 hover:text-gray-700 transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              href="/features"
              className="text-gray-500 hover:text-gray-700 transition-colors font-medium"
            >
              Features
            </Link>
            <Link
              href="/pricing"
              className="text-gray-500 hover:text-gray-700 transition-colors font-medium"
            >
              Pricing
            </Link>
            <Link
              href="/blog"
              className="text-gray-500 hover:text-gray-700 transition-colors font-medium"
            >
              Blog
            </Link>
            <Link
              href="/testimonials"
              className="text-gray-500 hover:text-gray-700 transition-colors font-medium"
            >
              Testimonials
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Button className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2 rounded-lg">
              Log In
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
