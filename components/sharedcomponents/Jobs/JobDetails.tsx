"use client";

import { Deletepop } from "@/components/pages/dashboard/Deletepop";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Applybtn } from "@/lib/ui";
import { JobData } from "@/types/Forms";

export default function JobDetailsPage({
  data,
  showbtn = false,
  delcard = false,
}: {
  data: JobData;
  showbtn?: boolean;
  delcard?: boolean;
}) {
  return (
    <div className="max-w-3xl mx-auto mt-10">
      <Card className="relative w-full">
        {showbtn && (
          <div className="absolute top-3 right-3 z-10">
            <Applybtn id={data.id} />
          </div>
        )}

        <CardHeader className={delcard ? "relative" : ""}>
          {delcard && (
            <div className="absolute top-3 right-3 z-10">
              <Deletepop jobId={data.id} />
            </div>
          )}
          <CardTitle className="text-2xl">{data.title}</CardTitle>
          <CardDescription className="text-md mt-1">
            {data.desc}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {data.requirements.map((req) => (
              <div
                key={req}
                className="rounded-md bg-teal-100 px-2 py-1 text-sm font-semibold shadow-sm"
              >
                {req}
              </div>
            ))}
          </div>

          {data.salary !== null && (
            <p className="font-medium text-gray-800">
              Salary: Rs. {data.salary}
            </p>
          )}
        </CardContent>

        <CardFooter className="flex flex-wrap gap-2 text-sm font-bold px-4 pb-4">
          {data.joblimit !== null && (
            <p className="text-gray-700">No. of seats: {data.joblimit}</p>
          )}
          {data.applied !== null && (
            <p className="text-gray-700">Applied: {data.applied}</p>
          )}
          <p className="bg-yellow-300 px-2 py-0.5 rounded text-gray-800">
            {data.jobType}
          </p>
          <p className="bg-yellow-300 px-2 py-0.5 rounded text-gray-800">
            {data.jobLoc}
          </p>
          <p className="bg-yellow-300 px-2 py-0.5 rounded text-gray-800">
            {data.jobCategory}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
