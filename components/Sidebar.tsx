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
    active: true,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <div className="w-20 lg:w-64 h-screen bg-background border-r border-border p-4 flex flex-col transition-all duration-300">
      {/* Logo */}
      <div className="flex flex-col lg:flex-row items-center gap-3 mb-8 lg:px-2 mt-2">
        <div className="w-10 h-10 bg-green-500/15 dark:bg-green-500/20 rounded-xl flex items-center justify-center shadow-sm border border-green-500/20">
          <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-500" />
        </div>
        <span className="text-xl font-bold text-foreground tracking-tight hidden lg:block">
          JobBoard
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1.5 sm:space-y-2">
        {navigationItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              href={item.path}
              key={item.label}
              className={cn(
                "group flex items-center w-full gap-3 h-11 px-3 lg:px-4 rounded-xl transition-all duration-200",
                isActive
                  ? "bg-green-500/15 dark:bg-green-500/20 text-green-700 dark:text-green-400 font-medium border border-green-500/20"
                  : "text-muted-foreground hover:bg-green-500/10 hover:text-green-700 dark:hover:text-green-400",
                !item.active && "opacity-50 cursor-not-allowed",
              )}
            >
              <item.icon 
                className={cn(
                  "w-5 h-5",
                  !isActive && "group-hover:scale-110 transition-transform duration-200"
                )} 
              />
              <span className="truncate hidden lg:inline">{item.label}</span>
              <div className="items-center gap-2 hidden lg:flex ml-auto">
                {!item.active && <Lock className="w-4 h-4 opacity-50" />}
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
            Join Workshop
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
