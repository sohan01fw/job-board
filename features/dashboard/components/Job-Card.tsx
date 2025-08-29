"use client";

import { MapPin, Clock, Bookmark, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface JobCardProps {
  company: string;
  logo: string;
  title: string;
  location: string;
  type: string;
  salary?: string;
  tags: string[];
  isActivityHiring?: boolean;
  postedTime: string;
}

export function JobCard({
  company,
  logo,
  title,
  location,
  type,
  salary,
  isActivityHiring,
  postedTime,
}: JobCardProps) {
  return (
    <Card className="p-6 hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
              <span className="text-lg font-bold">{logo}</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-foreground">{company}</h3>
                {isActivityHiring && (
                  <Badge className="bg-primary text-primary-foreground text-xs">
                    ACTIVITY HIRING
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                Unlimited design services for early stage startups
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-3">
          <div>
            <h4 className="font-medium text-foreground mb-1">{title}</h4>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {location}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {type}
              </div>
              {salary && <span>{salary}</span>}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">
                POSTED {postedTime}
              </span>
              <Button variant="ghost" size="icon" className="w-6 h-6">
                <Bookmark className="w-3 h-3" />
              </Button>
            </div>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Apply
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
