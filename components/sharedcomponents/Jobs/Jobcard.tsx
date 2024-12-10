import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { JobCategory, JobLoc, JobType } from "@prisma/client";

export function Jobcard({
  data,
}: {
  data: {
    title: string;
    desc: string;
    status: boolean;
    requirements: string[];
    salary: number | null;
    joblimit: number | null; // Allow null here
    jobType: JobType;
    jobLoc: JobLoc;
    jobCategory: JobCategory;
    links: string | null;
    applied: number | null;
    createdAt: Date;
  };
}) {
  return (
    <div className="">
      <Card className="">
        <CardHeader>
          <CardTitle>{data.title}</CardTitle>
          <CardDescription>{data.desc}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{data.requirements}</p>
          <p>Rs.{data.salary}</p>
        </CardContent>
        <CardFooter>
          <p>No.of seat: {data.joblimit}</p>
        </CardFooter>
        <CardContent>
          <p>{data.jobType}</p>
        </CardContent>
        <CardContent>
          <p>{data.jobLoc}</p>
        </CardContent>
        <CardContent>
          <p>{data.jobCategory}</p>
        </CardContent>
        <CardContent>
          <p>No.of applicant applied: {data.applied}</p>
        </CardContent>
      </Card>
    </div>
  );
}
