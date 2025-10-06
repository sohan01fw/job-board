import { getCachedUser } from "@/lib/redis";
import { JobFilters } from "./Job-filters";
import { JobList } from "./Job-list";

export async function JobBoard() {
  const user = await getCachedUser();
  return (
    <div className="flex  w-full bg-background">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-hidden">
          <div className="p-6 flex flex-col ">
            {/* Static filters */}
            <JobFilters />
            {/* Scrollable JobList */}
            <div className="mt-6 flex-1 ">
              <JobList user={user} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
