import {
  JobApplications,
  Jobs,
  Overview,
  Settings,
} from "@/components/pages/dashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SignOut } from "@/lib/ui";
export const dynamic = "force-dynamic";
export default function page() {
  return (
    <div className="m-2">
      <Tabs defaultValue="overview" className="border border-black">
        <TabsList className="">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="jobs">Jobs</TabsTrigger>
          <TabsTrigger value="application">Job Applications</TabsTrigger>
          <TabsTrigger value="setting">Settings</TabsTrigger>
        </TabsList>
        <div className="border border-black m-10 flex justify-center">
          <TabsContent value="overview">
            <Overview />
          </TabsContent>
          <TabsContent value="jobs">
            <Jobs />
          </TabsContent>
          <TabsContent value="application">
            <JobApplications />
          </TabsContent>
          <TabsContent value="setting">
            <Settings />
          </TabsContent>
        </div>
      </Tabs>
      <SignOut />
    </div>
  );
}
