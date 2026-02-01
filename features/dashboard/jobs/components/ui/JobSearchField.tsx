"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useJobSearchStore } from "../../lib/stores/joSearchStore";

export default function JobSearchField() {
  const { search, setSearch } = useJobSearchStore();
  const [localSearch, setLocalSearch] = useState(search);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(localSearch);
    }, 400); // 400ms delay

    return () => clearTimeout(timer);
  }, [localSearch, setSearch]);

  return (
    <div className="relative w-full max-w-md">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
      <Input
        type="text"
        value={localSearch}
        onChange={(e) => setLocalSearch(e.target.value)}
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
