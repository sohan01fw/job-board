"use client";
import { useEffect, useState } from "react";
import {
  JobApplications,
  Jobs,
  Overview,
  Settings,
} from "@/components/pages/dashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
export default function NavigationTabs() {
  //  const [activeValue, setActiveValue] = useState<string>();
  useEffect(() => {}, []);
  return (
    <div className="m-2">
      <Tabs defaultValue="account" className="w-[400px]">
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
