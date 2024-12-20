import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { JobData } from "@/types/Forms";

export function Jobcard({ data }: { data: JobData }) {
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
