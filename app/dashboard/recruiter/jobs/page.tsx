import { PostedJobFilter } from "@/features/dashboard/recruiter/components/PostedJobFilter";
import { PostedJobs } from "@/features/dashboard/recruiter/components/PostedJobs";
import { getCachedUser } from "@/lib/redis";

export default async function PostedJob() {
  const user = await getCachedUser();
  return (
    <div className="space-y-4 mt-5">
      <PostedJobFilter />
      <PostedJobs userId={user.id} />
    </div>
  );
}
