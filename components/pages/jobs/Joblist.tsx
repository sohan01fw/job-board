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
export const Joblist = ({ data }: { data: JobData }) => {
  return (
    <div className="m-2">
      <Card className="relative">
        <div className="absolute right-0">
          <Applybtn id={data.id} />
        </div>
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
};
