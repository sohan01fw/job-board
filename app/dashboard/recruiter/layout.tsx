import { WithRecruiterLayout } from "@/features/dashboard/recruiter/components/WithRecuiterLayout";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Recruiter",
};

export default async function RecruiterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <WithRecruiterLayout>{children}</WithRecruiterLayout>
    </div>
  );
}
