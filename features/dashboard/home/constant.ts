import { BookmarkPlus, Briefcase, Eye, Users } from "lucide-react";

const stats = [
  {
    title: "Total Applications",
    value: "24",
    change: "+12%",
    trend: "up",
    icon: Briefcase,
    description: "Applications this month",
  },
  {
    title: "Profile Views",
    value: "1,247",
    change: "+8%",
    trend: "up",
    icon: Eye,
    description: "Views this week",
  },
  {
    title: "Saved Jobs",
    value: "18",
    change: "+3",
    trend: "up",
    icon: BookmarkPlus,
    description: "Jobs saved recently",
  },
  {
    title: "Interview Invites",
    value: "5",
    change: "+2",
    trend: "up",
    icon: Users,
    description: "Pending interviews",
  },
];

const recentActivity = [
  {
    type: "application",
    company: "Google",
    position: "Senior UX Designer",
    location: "Remote",
    time: "2 hours ago",
    status: "pending",
  },
  {
    type: "view",
    company: "Microsoft",
    position: "Product Manager",
    location: "Seattle, WA",
    time: "5 hours ago",
    status: "viewed",
  },
  {
    type: "save",
    company: "Apple",
    position: "iOS Developer",
    location: "Cupertino, CA",
    time: "1 day ago",
    status: "saved",
  },
  {
    type: "interview",
    company: "Meta",
    position: "Frontend Engineer",
    location: "Menlo Park, CA",
    time: "2 days ago",
    status: "scheduled",
  },
];

const recommendedJobs = [
  {
    company: "Stripe",
    position: "Design Systems Lead",
    location: "San Francisco, CA",
    type: "Full-time",
    posted: "2 days ago",
    match: "95%",
  },
  {
    company: "Figma",
    position: "Senior Product Designer",
    location: "Remote",
    type: "Full-time",
    posted: "3 days ago",
    match: "92%",
  },
  {
    company: "Notion",
    position: "UX Researcher",
    location: "New York, NY",
    type: "Full-time",
    posted: "1 week ago",
    match: "88%",
  },
];

export { stats, recentActivity, recommendedJobs };
