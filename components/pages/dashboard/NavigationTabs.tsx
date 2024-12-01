"use client";
import {
  JobApplications,
  Jobs,
  Overview,
  Settings,
} from "@/components/pages/dashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
export default function NavigationTabs() {
  return (
    <div className="m-2">
      <Tabs defaultValue="overview" className="w-[400px]">
        <TabsList className="">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="jobs">Jobs</TabsTrigger>
          <TabsTrigger value="application">Job Applications</TabsTrigger>
          <TabsTrigger value="setting">Settings</TabsTrigger>
        </TabsList>

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
      </Tabs>
    </div>
  );
}
