"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

type Applicant = {
  id: string;
  coverLetter: string;
  status: string;
  user: {
    id: string;
    name: string;
    email: string;
    img?: string;
    phone?: string;
    experience?: string;
    github?: string;
    linkedin?: string;
    resume?: string;
  };
};

export default function Applicants({ applicants }: { applicants: any }) {
  const [selected, setSelected] = useState<Applicant | null>(null);

  return (
    <div className="flex flex-col md:flex-row h-screen border rounded-lg overflow-hidden">
      {/* Left Side: Applicants List */}
      <div className="w-full md:w-1/3 border-r">
        <ScrollArea className="h-full">
          <div className="p-4 space-y-3">
            {applicants.map((applicant: any) => (
              <Card
                key={applicant.id}
                className={`cursor-pointer transition hover:bg-muted ${
                  selected?.id === applicant.id ? "bg-muted" : ""
                }`}
                onClick={() => setSelected(applicant)}
              >
                <CardContent className="flex items-center gap-3 p-3">
                  <Avatar>
                    <AvatarImage src={applicant.user.img} />
                    <AvatarFallback>
                      {applicant.user.name?.[0] ?? "?"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-medium">{applicant.user.name}</span>
                    <span className="text-sm text-muted-foreground truncate">
                      {applicant.user.email}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Right Side: Applicant Detail */}
      <div className="flex-1 p-6 overflow-y-auto">
        {selected ? (
          <div className="space-y-6">
            {/* Applicant Info */}
            <div>
              <h2 className="text-xl font-semibold flex items-center gap-2">
                {selected.user.name}
                <Badge variant="outline">{selected.status}</Badge>
              </h2>
              <p className="text-sm text-muted-foreground">
                {selected.user.email}
              </p>
              {selected.user.phone && (
                <p className="text-sm text-muted-foreground">
                  {selected.user.phone}
                </p>
              )}
            </div>

            <Separator />

            {/* Cover Letter */}
            <div>
              <h3 className="text-lg font-medium mb-2">Cover Letter</h3>
              <p className="text-sm leading-relaxed whitespace-pre-line">
                {selected.coverLetter.replace(/(^"|"$)/g, "")}
              </p>
            </div>

            <Separator />

            {/* Resume Preview */}
            <div>
              <h3 className="text-lg font-medium mb-2">Resume</h3>
              {selected.user.resume ? (
                <embed
                  src={selected.user.resume}
                  type="application/pdf"
                  className="w-full h-[600px] border rounded-lg"
                />
              ) : (
                <p className="text-sm text-muted-foreground">
                  No resume uploaded
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            Select an applicant to preview their details
          </div>
        )}
      </div>
    </div>
  );
}
