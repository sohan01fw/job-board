"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { handleLogOutBtn } from "./ui/logout";
import ThemeToggle from "@/components/ThemeToggle";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useFetchUserFields,
  useUpdateStatus,
} from "../user/profile/hooks/useUpdateUser";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { NotificationsDropdown } from "../notifications/Notifications";

type Status = "IDLE" | "OPENTOWORK" | "HIRING";

export function Header({
  img,
  email,
  uId,
}: {
  img: string;
  email: string;
  uId: string;
}) {
  const { loading, updateStatus } = useUpdateStatus();
  const router = useRouter();
  const [selectedValue, setSelectedValue] = useState<Status>("IDLE");
  const {
    data,
    fetchFields,
    loading: loadingFields,
  } = useFetchUserFields({ email });

  useEffect(() => {
    const fetchUserFields = async () => {
      await fetchFields({ fields: "status" }); // pass fields you need
    };
    fetchUserFields();
  }, [selectedValue]);

  const handleUpdateStatus = async (status: Status) => {
    await updateStatus({ email, status });
    setSelectedValue(status);
  };

  const handlePostJobBtn = async () => {
    router.push("/dashboard/recruiter");
  };
  return (
    <header className="h-16 border-b border-border bg-background px-6 flex items-center justify-between">
      {/* Date */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-10  sm:p-2 ">
        <div className="text-sm sm:text-lg text-muted-foreground">
          <span className="w-2 h-2 bg-green-500  rounded-full"></span>
          Friday, 23 August
        </div>

        {loadingFields ? (
          <Skeleton className="h-4 w-40 bg-gray-200 dark:bg-gray-700 rounded-2xl" />
        ) : (
          <Select
            defaultValue={data.status}
            onValueChange={(val: Status) => handleUpdateStatus(val)}
          >
            <SelectTrigger className="w-40 rounded-2xl" loading={loading}>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                value="IDLE"
                className="flex items-center gap-2 cursor-pointer"
              >
                <span className="inline-block w-2 h-2 bg-yellow-500 rounded-full mr-2" />
                Idle
              </SelectItem>

              <SelectItem
                value="OPENTOWORK"
                className="flex items-center gap-2 cursor-pointer"
              >
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2" />
                Open to Work
              </SelectItem>
              <SelectItem
                value="HIRING"
                className="flex items-center gap-2 cursor-pointer"
              >
                <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-2" />
                Hiring
              </SelectItem>
            </SelectContent>
          </Select>
        )}
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {loadingFields ? (
          <Skeleton className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded-md" />
        ) : (
          data.status === "HIRING" && (
            <Button onClick={handlePostJobBtn}>Post a Job</Button>
          )
        )}
        <ThemeToggle />
        <div className="relative">
          <NotificationsDropdown userId={uId} />
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
