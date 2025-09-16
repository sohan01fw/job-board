import { PostedJobs } from "@/features/dashboard/recruiter/components/PostedJobs";
import { getUser } from "@/lib/Actions/Users";

export default async function PostedJob() {
  const user = await getUser();
  return (
    <div>
      <PostedJobs userId={user.id} />
    </div>
  );
}
