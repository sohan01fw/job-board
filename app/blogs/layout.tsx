import { Navbar } from "@/components/pages/index/Navbar";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "blogs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div lang="en">
      <Navbar />
      <div>
        <div className="m-10">
          <h1 className="text-4xl font-bold ">Welcome to Blogs</h1>
        </div>
      </div>
      <Toaster />
      <div>{children}</div>
    </div>
  );
}
