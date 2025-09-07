import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GetAllPostedJobs } from "@/features/dashboard/recruiter/actions";
import { PostJobForm } from "@/features/dashboard/recruiter/components/Postajob";
import { PostedJobs } from "@/features/dashboard/recruiter/components/PostedJobs";
import { JobPreview } from "@/features/dashboard/recruiter/components/PreviewJob";
import { getUser } from "@/lib/Actions/Users";

export default async function Dashboard() {
  const user = await getUser();
  const jobs = await GetAllPostedJobs({ userId: user.id });
  return (
    <Tabs defaultValue="postajob" className="m-5 ">
      <TabsList>
        <TabsTrigger value="postajob">Post a Job</TabsTrigger>
        <TabsTrigger value="applicants">Applicants</TabsTrigger>
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
            <PostJobForm user={user} />
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
        <PostedJobs jobs={jobs} />
      </TabsContent>
    </Tabs>
  );
}
