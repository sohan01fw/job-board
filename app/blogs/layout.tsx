import { Navbar } from "@/components/pages/index/Navbar";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { authUser } from "@/lib/Actions/Users";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "blogs",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await authUser();
  return (
    <div lang="en">
      <Navbar />
      <div>
        <div className="m-10 flex justify-between">
          <h1 className="text-4xl font-bold ">Welcome to Blogs</h1>
          {user.user !== null && <Button>create a blog post</Button>}
        </div>
      </div>
      <Toaster />
      <div>{children}</div>
    </div>
  );
}
