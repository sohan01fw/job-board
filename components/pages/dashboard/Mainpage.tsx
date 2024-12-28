"use client";
import JobApplication from "@/app/dashboard/job-applications/page";
import Jobs from "@/app/dashboard/jobs/page";
import Overview from "@/app/dashboard/overview/page";
import Settings from "@/app/dashboard/setting/page";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SignOut } from "@/lib/ui";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
export default function Mainpage() {
  const pathname = usePathname();
  const pathArr = pathname.split("/");
  const pathValue = pathArr[pathArr.length - 1];
  console.log(pathValue);
  return (
    <div className="m-2">
      <Tabs
        defaultValue={
          pathValue === "overview" || "jobs" || "job-applications" || "setting"
            ? pathValue
            : ""
        }
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
