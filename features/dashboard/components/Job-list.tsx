"use client";

import { JobCard } from "./Job-Card";

const jobs = [
  {
    company: "Catalog",
    logo: "C",
    title: "Brand Designer",
    location: "Toronto",
    type: "Remote only",
    salary: "60k - 80k",
    tags: ["Design", "Remote"],
    isActivityHiring: true,
    postedTime: "1 HOUR AGO",
  },
  {
    company: "Height",
    logo: "H",
    title: "Design Director",
    location: "New York",
    type: "Remote only",
    salary: "140k - 180k",
    tags: ["Design", "Leadership"],
    isActivityHiring: false,
    postedTime: "2 HOURS AGO",
  },
  {
    company: "Height",
    logo: "H",
    title: "Pre PMF-Product Designer",
    location: "Los Angeles",
    type: "Remote only",
    salary: "80k - 120k",
    tags: ["Product", "Design"],
    isActivityHiring: true,
    postedTime: "3 HOURS AGO",
  },
];

export function JobList() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-foreground">Ideal Matches</h2>
      <div className="space-y-4 h-80 overflow-auto">
        {jobs.map((job, index) => (
          <JobCard key={index} {...job} />
        ))}
      </div>
    </div>
  );
}
