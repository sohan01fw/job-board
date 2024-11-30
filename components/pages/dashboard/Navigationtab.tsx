import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Overview from "./Overview";
import Jobs from "./Jobs";
import JobApplication from "./JobApplications";
import Settings from "./Settings";
export function Navigationtab() {
  return (
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
        <JobApplication />
      </TabsContent>
      <TabsContent value="setting">
        <Settings />
      </TabsContent>
    </Tabs>
  );
}
