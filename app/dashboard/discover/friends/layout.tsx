import { ConnectionsTabs } from "@/features/dashboard/discover/components/ui/ConnectionTabs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connections",
  description: "View mutual friends, following, and followers",
};

export default function ConnectionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <ConnectionsTabs />

      {/* Page content (changes per route) */}
      {children}
    </div>
  );
}
