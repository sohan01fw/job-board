import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TotalJobCount } from "@/lib/Actions/AggregateData";
import { Label } from "../ui/label";

interface TotalJobCard {
  allJob: object;
  totalJob: number;
}

export async function DataCard({ allJob, totalJob }: TotalJobCard) {
  return (
    <div className="w-64">
      <Card>
        <CardHeader>
          <CardTitle>Total Jobs: {totalJob}</CardTitle>
          <CardDescription className="text-sm font-semibold">
            Jobs detail count
          </CardDescription>
        </CardHeader>
        {/* @ts-ignore */}
        {allJob?.data.map((data: any) => {
          return (
            <CardContent key={data.jobCategory} className="flex flex-row gap-2">
              <p>{data.jobCategory}:</p>
              <p>{data._count.id}</p>
            </CardContent>
          );
        })}
      </Card>
    </div>
  );
}

interface TotalApplicantCard {
  totalApplicant: number;
  allApplicant: object;
}

export async function ApplicantCard({
  totalApplicant,
  allApplicant,
}: TotalApplicantCard) {
  return (
    <div className="w-64">
      <Card>
        <CardHeader>
          <CardTitle>Total Applicants: {totalApplicant}</CardTitle>
          <CardDescription className="text-sm font-semibold">
            Applicants detail count
          </CardDescription>
        </CardHeader>
        {/* @ts-ignore */}
        {allApplicant?.data.map((data: any) => {
          return (
            <CardContent key={data.jobCategory} className="flex flex-row gap-2">
              <p>{data.jobCategory}:</p>
              <p>{data._sum.applied}</p>
            </CardContent>
          );
        })}
      </Card>
    </div>
  );
}
