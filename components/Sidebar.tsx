"use client";

import {
  Home,
  User,
  Briefcase,
  MessageSquare,
  Compass,
  CheckCircle,
  Lock,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigationItems = [
  { icon: Home, label: "Home", path: "/dashboard", active: true },
  { icon: Briefcase, label: "Jobs", path: "/dashboard/jobs", active: true },
  {
    icon: Compass,
    label: "Discover",
    path: "/dashboard/discover",
    active: true,
  },
  {
    icon: MessageSquare,
    label: "Messages",
    path: "/dashboard/messages",
    active: true,
  },
  {
    icon: User,
    label: "Profile",
    path: "/dashboard/user/profile",
    active: true,
  },
  {
    icon: Settings,
    label: "Setting",
    path: "/dashboard/setting",
    active: false,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <div className="w-20 lg:w-64 h-screen bg-sidebar border-r border-sidebar-border p-4 flex flex-col">
      {/* Logo */}
      <div className="flex flex-col lg:flex-row items-center gap-2 mb-8">
        <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
          <CheckCircle className="w-5 h-5 text-primary-foreground" />
        </div>
        <span className="text-xl font-bold text-sidebar-foreground">
          JobNest
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 sm:space-y-2">
        {navigationItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              href={item.path}
              key={item.label}
              className={cn(
                "flex items-center w-full gap-3 h-12 px-4 rounded-lg transition-colors duration-200",
                isActive
                  ? "bg-gray-800 text-white  font-medium"
                  : "text-gray-600 hover:bg-gray-100 hover:text-black",
                !item.active && "opacity-50 cursor-not-allowed",
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="truncate hidden lg:inline">{item.label}</span>
              <div className=" items-center gap-2 hidden lg:flex">
                {!item.active && <Lock className="w-4 h-4" />}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Promotional Card */}
      <Card className="hidden lg:block mt-auto bg-gradient-to-br from-purple-500 to-pink-500 text-white border-0">
        <CardContent className="p-4">
          <h3 className="font-bold text-sm mb-1">Elevated Your Idea</h3>
          <h3 className="font-bold text-sm mb-2">Prototyping To Next Level</h3>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 bg-white/20 rounded flex items-center justify-center">
              <span className="text-xs">🎨</span>
            </div>
            <div className="w-6 h-6 bg-white/20 rounded flex items-center justify-center">
              <span className="text-xs">✨</span>
            </div>
          </div>
          <Button
            size="sm"
            className="w-full bg-white/20 hover:bg-white/30 text-white border-0"
          >
            Join To Workshop
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
