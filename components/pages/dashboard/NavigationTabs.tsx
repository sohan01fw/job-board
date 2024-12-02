"use client";
import {
  JobApplications,
  Jobs,
  Overview,
  Settings,
} from "@/components/pages/dashboard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/lib/supabase/supabase_client";
import { AuthError } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

export default function NavigationTabs() {
  async function signOut() {
    const { error }: { error: AuthError | null } =
      await supabase.auth.signOut();
    if (error) {
      throw new Error("error while logout user");
    } else {
      redirect("/auth/login");
    }
  }
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
      <Button onClick={signOut}>logOut</Button>
    </div>
  );
}
