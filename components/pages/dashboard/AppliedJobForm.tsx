"use client";

import Link from "next/link";

export function AppliedJobForm({ jobform }: { jobform: any }) {
  return (
    <div>
      {jobform.jobForm.map((data: any) => (
        <div key={data.id} className="border border-black m-5 p-5">
          <div>{data.fname}</div>
          resume:
          <Link href={data.resume} className="text-blue-600" target="_blank">
            {data.resume}
          </Link>
        </div>
      ))}
    </div>
  );
}
