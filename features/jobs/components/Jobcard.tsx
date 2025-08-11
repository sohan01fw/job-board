import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useJobStore } from "@/features/jobs/stores/JobStore";
import { JobData } from "../types";

export function Jobcard({ data }: { data: JobData }) {
  const { setJob } = useJobStore();
  return (
    <div onClick={() => setJob(data)} className="w-96 cursor-pointer mb-2 ">
      <Card className="h-44 relative overflow-hidden">
        <CardHeader className="p-3">
          <CardTitle className="text-base">{data.title}</CardTitle>
          <CardDescription className="text-sm line-clamp-2">
            {data.desc}
          </CardDescription>
        </CardHeader>
        <CardFooter className="  left-3 flex gap-1 flex-wrap text-xs font-bold">
          <p className="bg-yellow-300 px-2 py-0.5 rounded text-gray-700">
            {data.jobType}
          </p>
          <p className="bg-yellow-300 px-2 py-0.5 rounded text-gray-700">
            {data.jobLoc}
          </p>
          <p className="bg-yellow-300 px-2 py-0.5 rounded text-gray-700">
            {data.jobCategory}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
