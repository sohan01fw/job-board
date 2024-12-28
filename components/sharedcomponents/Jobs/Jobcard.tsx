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

export function Jobcard({
  data,
  showbtn,
  delcard,
}: {
  data: JobData;
  showbtn: boolean;
  delcard: boolean;
}) {
  return (
    <div className="min-w-40">
      <Card className="relative">
        {showbtn && (
          <div className="absolute right-0">
            <Applybtn id={data.id} />
          </div>
        )}
        <CardHeader className={`${delcard && "relative"}`}>
          {delcard && (
            <div className=" absolute right-0 m-1 mr-2 top-0 border  min-w-5 rounded-full">
              <Deletepop jobId={data.id} />
            </div>
          )}
          <CardTitle>{data.title}</CardTitle>
          <CardDescription>{data.desc}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row flex-wrap gap-2 ">
            {data.requirements.map((data) => (
              <div
                key={data}
                className="rounded-lg shadow-md bg-teal-200/30 font-semibold p-1"
              >
                {data}
              </div>
            ))}
          </div>
          <p className="font-semibold mt-5">Salary:Rs.{data.salary}</p>
        </CardContent>
        <CardFooter>
          <p className="font-medium">No.of seat: {data.joblimit}</p>
        </CardFooter>
        <CardContent className="flex flex-row flex-wrap  gap-2 font-bold text-sm">
          <p className="bg-yellow-300 p-1 rounded-lg shadow-md text-gray-700">
            {data.jobType}
          </p>
          <p className="bg-yellow-300 p-1 rounded-lg shadow-md text-gray-700">
            {data.jobLoc}
          </p>
          <p className="bg-yellow-300 p-1 rounded-lg shadow-md text-gray-700">
            {data.jobCategory}
          </p>
        </CardContent>
        <CardContent>
          <p className="font-medium">No.of applicant applied: {data.applied}</p>
        </CardContent>
      </Card>
    </div>
  );
}
