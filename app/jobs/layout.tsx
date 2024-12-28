import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "jobs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div lang="en">
      <div>
        <div className="m-10">
          <h1 className="text-4xl font-bold ">Welcome,Applicant</h1>
        </div>
      </div>
      <Toaster />
      <div>{children}</div>
    </div>
  );
}
