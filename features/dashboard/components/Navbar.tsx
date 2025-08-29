"use client";

import { Bell, ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { handleLogOutBtn } from "../lib/logout";
import ThemeToggle from "@/components/ThemeToggle";

export function Header({ img }: { img: string }) {
  return (
    <header className="h-16 border-b border-border bg-background px-6 flex items-center justify-between">
      {/* Date */}

      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-10  sm:p-2 ">
        <div className="text-sm sm:text-lg text-muted-foreground">
          Friday, 23 August
        </div>

        <div className="relative bg-gray-100 flex items-center gap-3 p-1 px-4 rounded-xl text-sm sm:text-base hover:cursor-pointer">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 w-2 h-2 bg-green-500 rounded-full"></span>
          <h3 className="ml-5 truncate font-medium text-sm  ">open to work</h3>
          <span>
            <ChevronDown size={14} className="text-gray-600" />
          </span>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <div className="relative">
          <Bell className="w-5 h-5 hover:cursor-pointer" />
          <span className="absolute -top-2 -right-1 w-2 h-2 bg-green-500 rounded-full"></span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className=" outline-none border-none focus:outline-none focus:border-none">
            <Avatar className="w-8 h-8 ">
              <AvatarImage src={img} />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48 " align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-500 hover:cursor-pointer"
              onClick={handleLogOutBtn}
            >
              Log Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
