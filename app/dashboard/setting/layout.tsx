import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Settings",
};

export default async function SettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
