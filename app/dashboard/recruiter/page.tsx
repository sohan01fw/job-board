import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PostJobForm } from "@/features/dashboard/recruiter/components/Postajob";
import { JobPreview } from "@/features/dashboard/recruiter/components/PreviewJob";

export default function Dashboard() {
  return (
    <Tabs defaultValue="postajob" className="m-5 ">
      <TabsList>
        <TabsTrigger value="postajob">Post a Job</TabsTrigger>
        <TabsTrigger value="applicants">Applicants</TabsTrigger>
        <TabsTrigger value="history">History</TabsTrigger>
      </TabsList>

      <TabsContent value="postajob">
        {/* Post job form goes here */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
          {/* Form Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">
                Create Job Posting
              </h2>
              <div className="text-sm text-muted-foreground">
                Fill out the details below
              </div>
            </div>
            <PostJobForm />
          </div>

          {/* Preview Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">
                Live Preview
              </h2>
              <div className="text-sm text-muted-foreground">
                See how your job will appear
              </div>
            </div>
            <JobPreview />
          </div>
        </div>
      </TabsContent>

      <TabsContent value="applicants">
        {/* Applicants list goes here */}
      </TabsContent>

      <TabsContent value="history">
        {/* Job posting history goes here */}
      </TabsContent>
    </Tabs>
  );
}
