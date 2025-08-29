"use client";

import { ChevronDown, Filter, ArrowUpDown, Grid3X3, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const filterTabs = [
  { label: "Browse all", count: null, active: false },
  { label: "Ideal Matches", count: "132,098", active: true },
  { label: "Saved", count: "3 items", active: false },
  { label: "Hidden", count: "12 items", active: false },
];

export function JobFilters() {
  return (
    <div className="space-y-4">
      {/* Filter Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" className="gap-2 bg-transparent">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
          <Button variant="outline" className="gap-2 bg-transparent">
            <ArrowUpDown className="w-4 h-4" />
            Sort
          </Button>
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

      {/* Filter Tags */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Sorting Tags</span>
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="gap-1">
            Remote only
            <button className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5">
              ×
            </button>
          </Badge>
          <Badge variant="secondary" className="gap-1">
            Activity hiring
            <button className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5">
              ×
            </button>
          </Badge>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-border">
        {filterTabs.map((tab) => (
          <button
            key={tab.label}
            className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
              tab.active
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
            {tab.count && (
              <span className="ml-2 text-xs text-muted-foreground">
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
