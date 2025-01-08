import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface TotalJobCard {
  allJob: { data: JobData[] } | { error: string };
  totalJob: number;
}

interface JobData {
  jobCategory: string;
  _count: { id: number };
}

export function DataCard({ allJob, totalJob }: TotalJobCard) {
  if ("error" in allJob) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Error Loading Jobs</CardTitle>
          <CardDescription>Please try again later</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Total Jobs: {totalJob}
        </CardTitle>
        <CardDescription>Jobs detail count</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {allJob.data.map((data: JobData) => (
            <li
              key={data.jobCategory}
              className="flex justify-between items-center"
            >
              <span className="text-sm font-medium">{data.jobCategory}:</span>
              <span className="text-sm font-bold">{data._count.id}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

interface TotalApplicantCard {
  totalApplicant: number;
  allApplicant: { data: ApplicantData[] } | { error: string };
}

interface ApplicantData {
  jobCategory: string;
  _sum: { applied: number };
}

export function ApplicantCard({
  totalApplicant,
  allApplicant,
}: TotalApplicantCard) {
  if ("error" in allApplicant) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Error Loading Applicants</CardTitle>
          <CardDescription>Please try again later</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Total Applicants: {totalApplicant}
        </CardTitle>
        <CardDescription>Applicants detail count</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {allApplicant.data.map((data: ApplicantData) => (
            <li
              key={data.jobCategory}
              className="flex justify-between items-center"
            >
              <span className="text-sm font-medium">{data.jobCategory}:</span>
              <span className="text-sm font-bold">{data._sum.applied}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
