import JobApplication from "@/app/dashboard/job-applications/page";
import Jobs from "@/app/dashboard/jobs/page";
import Overview from "@/app/dashboard/overview/page";
import Settings from "@/app/dashboard/setting/page";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SignOut } from "@/lib/ui";
import Link from "next/link";
export const dynamic = "force-dynamic";
export default function Mainpage() {
  return (
    <div className="m-2">
      <Tabs defaultValue="overview" className="border border-black">
        <TabsList className="">
          <Link href="/dashboard/overview">
            <TabsTrigger value="overview">Overview</TabsTrigger>
          </Link>
          <Link href="/dashboard/jobs">
            <TabsTrigger value="jobs">Jobs</TabsTrigger>
          </Link>
          <Link href="/dashboard/job-applications">
            <TabsTrigger value="application">Job Applications</TabsTrigger>
          </Link>
          <Link href="/dashboard/setting">
            <TabsTrigger value="setting">Settings</TabsTrigger>
          </Link>
        </TabsList>
      </Tabs>
    </div>
  );
}
