import { PostJobForm } from "@/features/dashboard/recruiter/components/Postajob";
import { JobPreview } from "@/features/dashboard/recruiter/components/PreviewJob";
import { getUser } from "@/lib/Actions/Users";

export default async function PostAJob() {
  const user = await getUser();
  return (
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
  );
}
