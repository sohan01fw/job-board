"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useJobSearchStore } from "../../lib/stores/joSearchStore";

export default function JobSearchField() {
  const { search, setSearch } = useJobSearchStore();

  return (
    <div className="relative w-full max-w-md">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
      <Input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search jobs..."
        className="
          pl-10 pr-4 py-2
          rounded-2xl
          bg-background
          border border-border
          shadow-sm
          transition-all duration-200
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-green-500/60
          focus-visible:border-green-500
        "
      />
    </div>
  );
}
