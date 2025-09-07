"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Applicant } from "../../types";
import { Clock, CheckCircle, XCircle } from "lucide-react";
import { JSX } from "react/jsx-runtime";
import { useUpdateJobApplicantions } from "../../hooks/useUpdateJobAppStatus";

export function StatusSelect({ applicants }: { applicants: Applicant }) {
  const [status, setStatus] = useState<"PENDING" | "ACCEPTED" | "REJECTED">(
    applicants.status as "PENDING" | "ACCEPTED" | "REJECTED",
  );
  const { mutate, isPending } = useUpdateJobApplicantions();

  const handleChange = (newStatus: "PENDING" | "ACCEPTED" | "REJECTED") => {
    setStatus(newStatus);
    mutate({
      applicants,
      newStatus,
    });
  };

  const statusIcons: Record<"PENDING" | "ACCEPTED" | "REJECTED", JSX.Element> =
    {
      PENDING: <Clock className="w-4 h-4 text-yellow-500" />,
      ACCEPTED: <CheckCircle className="w-4 h-4 text-green-500" />,
      REJECTED: <XCircle className="w-4 h-4 text-red-500" />,
    };

  return (
    <div>
      <Select value={status} onValueChange={handleChange}>
        <SelectTrigger loading={isPending} className="w-40 rounded-2xl">
          <SelectValue placeholder={status.toLowerCase()} />
        </SelectTrigger>
        <SelectContent>
          {(["PENDING", "ACCEPTED", "REJECTED"] as const).map((s) => (
            <SelectItem key={s} value={s} className="cursor-pointer">
              <div className="flex items-center gap-2">
                {statusIcons[s]}
                <span className="capitalize">{s.toLowerCase()}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
