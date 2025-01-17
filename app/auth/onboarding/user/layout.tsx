import { Toaster } from "@/components/ui/toaster";
import { redirectUser } from "@/lib/process";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await redirectUser();
  return (
    <div>
      <main>{children}</main>
      <Toaster />
    </div>
  );
}
