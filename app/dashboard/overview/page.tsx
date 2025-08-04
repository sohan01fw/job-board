import {
  ApplicantCard,
  DataCard,
} from "@/components/sharedcomponents/DataCard";
import { DataChart } from "@/components/sharedcomponents/DataChart";
import {
  TotalApplicantCount,
  TotalJobCount,
} from "@/lib/Actions/AggregateData";
import { Suspense } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase/supabase_client";

export const dynamic = "force-dynamic";

export default async function Overview() {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  console.log(session?.user); // should not be null

  //for jobs
  const allJob = await TotalJobCount();
  if ("error" in allJob) {
    alert(allJob.message);
  }

  const totaljobs = allJob.data.reduce(
    (a: any, c: any) => a + (c?._count?.id || 0),
    0,
  );
  //for applicant
  const allApplicant = await TotalApplicantCount();
  if ("error" in allApplicant) {
    alert(allApplicant.message);
  }
  const totalApplicant = allApplicant.data.reduce(
    (a: any, c: any) => a + (c?._sum.applied || 0),
    0,
  );
  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1> */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Suspense fallback={<CardSkeleton />}>
          <DataCard totalJob={totaljobs} allJob={allJob} />
        </Suspense>
        <Suspense fallback={<CardSkeleton />}>
          <ApplicantCard
            totalApplicant={totalApplicant}
            allApplicant={allApplicant}
          />
        </Suspense>
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your job board efficiently</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2">
            <Link href="/dashboard/createjob">
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-2 rounded-md">
                Post a New Job
              </Button>
            </Link>
            <Link href="/dashboard/jobs">
              <button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 py-2 rounded-md">
                View Jobs Applications
              </button>
            </Link>
          </CardContent>
        </Card>
      </div>
      <Suspense fallback={<CardSkeleton className="h-[400px]" />}>
        <div className="">
          <h1 className="text-3xl font-bold tracking-tight">
            Job Market Overview
          </h1>
          <span className="text-md  font-semibold text-gray-400">
            Jan-June 2024
          </span>
        </div>
        <DataChart />
      </Suspense>
    </div>
  );
}

function CardSkeleton({ className }: { className?: string }) {
  return (
    <Card className={className}>
      <CardHeader>
        <Skeleton className="h-8 w-[200px]" />
        <Skeleton className="h-4 w-[300px]" />
      </CardHeader>
      <CardContent className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[150px]" />
      </CardContent>
    </Card>
  );
}
