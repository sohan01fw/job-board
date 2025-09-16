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
import ThemeToggle from "@/components/ThemeToggle";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  useFetchUserFields,
  useUpdateStatus,
} from "@/features/dashboard/user/profile/hooks/useUpdateUser";
import { NotificationsDropdown } from "@/features/dashboard/notifications/Notifications";
import { handleLogOutBtn } from "./logout";
import { SelectSkeleton } from "@/lib/LoadingUi";

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
  const router = useRouter();

  const { user: data, isLoading } = useFetchUserFields(email);
  const updateStatus = useUpdateStatus({ email });

  const handleUpdateStatus = (status: Status) => {
    updateStatus.mutate({ status }); // optimistic update
  };

  const handlePostJobBtn = async () => {
    router.push("/dashboard/recruiter/postjob");
  };
  const today = new Date(); // Gets the current date
  const options: any = { weekday: "long", day: "numeric", month: "long" };
  const shortDate = new Intl.DateTimeFormat("en-US", options).format(today);

  return (
    <header className="h-20 md:h-16 border-b border-border bg-background px-6  flex items-center justify-between">
      {/* Date */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-10  sm:p-2 ">
        <div className="text-sm sm:text-lg text-muted-foreground flex items-center gap-2 font-medium">
          {shortDate}
        </div>

        {isLoading ? (
          <SelectSkeleton />
        ) : (
          <Select
            defaultValue={data?.status}
            onValueChange={(val: Status) => handleUpdateStatus(val)}
          >
            <SelectTrigger
              className="w-40 rounded-2xl"
              loading={updateStatus.isPending}
            >
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
        {data.status === "HIRING" && (
          <Button onClick={handlePostJobBtn}>Post a Job</Button>
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
