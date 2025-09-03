"use client";

import { useState } from "react";
import { Filter, ArrowUpDown, Grid3X3, List, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useJobSortStore } from "../lib/stores/sortstore";
import { useJobFilterStore } from "../lib/stores/filterStore";

const filterOptions = ["Remote only", "fulltime", "Internship"];
const sortOptions = [
  "Newest",
  "Oldest",
  "Salary High → Low",
  "Salary Low → High",
];

export function JobFilters() {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [activeSort, setActiveSort] = useState<string>("Newest");
  const { setSort } = useJobSortStore();
  const { setFilter } = useJobFilterStore();

  const addFilter = (filter: string) => {
    if (!activeFilters.includes(filter)) {
      setActiveFilters([...activeFilters, filter]);
      setFilter([...activeFilters, filter]);
    }
  };

  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter((f) => f !== filter));
    setFilter(activeFilters.filter((f) => f !== filter));
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

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Grid3X3 className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Filter & Sort Badges */}
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="outline" className="gap-1">
          Sort: {activeSort}
        </Badge>
        {activeFilters.map((filter) => (
          <Badge key={filter} variant="secondary" className="gap-1">
            {filter}
            <button
              onClick={() => removeFilter(filter)}
              className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
            >
              <X className="w-3 h-3" />
            </button>
          </Badge>
        ))}
      </div>
    </div>
  );
}
