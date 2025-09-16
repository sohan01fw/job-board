"use client";

import { useState } from "react";
import { Filter, ArrowUpDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePostedJobsFilterStore } from "../stores/filterPostedJobs";
import { usePostedJobSortStore } from "../stores/sortPostedJobs";

const filterOptions = ["hasApplicants", "noApplicants"];
const sortOptions = ["Newest", "Oldest"];

export function PostedJobFilter() {
  const [activeFilters, setActiveFilters] = useState<string>("");
  const [activeSort, setActiveSort] = useState<string>("Newest");
  const { setSort } = usePostedJobSortStore();
  const { setFilter } = usePostedJobsFilterStore();

  const addFilter = (filter: string) => {
    if (!activeFilters.includes(filter)) {
      setActiveFilters(filter);
      setFilter(filter);
    }
  };

  const removeFilter = () => {
    setActiveFilters("");
    setFilter("");
  };

  return (
    <div className="space-y-4">
      {/* Filter Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 bg-transparent">
                <Filter className="w-4 h-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {filterOptions.map((opt) => (
                <DropdownMenuItem key={opt} onClick={() => addFilter(opt)}>
                  {opt}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 bg-transparent">
                <ArrowUpDown className="w-4 h-4" />
                Sort
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {sortOptions.map((opt) => (
                <DropdownMenuItem
                  key={opt}
                  onClick={() => {
                    setActiveSort(opt);
                    setSort(opt);
                  }}
                >
                  {opt}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Filter & Sort Badges */}
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="outline" className="gap-1">
          Sort: {activeSort}
        </Badge>

        <Badge key={activeFilters} variant="secondary" className="gap-1">
          {activeFilters}
          {activeFilters !== "" && (
            <button
              onClick={() => removeFilter()}
              className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </Badge>
      </div>
    </div>
  );
}
