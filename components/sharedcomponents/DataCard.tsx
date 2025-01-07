import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface TotalJobCard {
  allJob: object;
  totalJob: number;
}
interface Data {
  jobCategory: string;
  _count: { id: string };
  _sum: { applied: string };
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
        {/* @ts-expect-error: there might not be the value in alljob.data so becarefull */}
        {allJob?.data.map((data: Data) => {
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
        {/* @ts-expect-error: there might not be the value in alljob.data so becarefull */}
        {allApplicant?.data.map((data: Data) => {
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
