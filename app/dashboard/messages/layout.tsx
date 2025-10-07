import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Messages",
};

export default async function MessageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
