"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function Mainpage() {
  const pathname = usePathname();
  const pathArr = pathname.split("/");
  const pathValue: string = pathArr[pathArr.length - 1];
  const pathValueArr = ["overview", "jobs", "job-applications", "setting"];
  return (
    <div className="m-2">
      <Tabs
        defaultValue={pathValueArr.includes(pathValue) ? pathValue : ""}
        className=""
      >
        <TabsList className="">
          <Link href="/dashboard/overview">
            <TabsTrigger value="overview">Overview</TabsTrigger>
          </Link>
          <Link href="/dashboard/jobs">
            <TabsTrigger value="jobs">Jobs</TabsTrigger>
          </Link>
        </TabsList>
      </Tabs>
    </div>
  );
}
