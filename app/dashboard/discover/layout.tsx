import type { Metadata } from "next";
import { DiscoverTabs } from "@/features/dashboard/discover/components/ui/DiscoverTabs";

export const metadata: Metadata = {
  title: "Discover",
  description: "Discover new posts and connections",
};

export default function DiscoverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header + Tabs */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Discover</h1>
        <DiscoverTabs />
      </div>

      {/* Page content (changes per route) */}
      {children}
    </div>
  );
}
