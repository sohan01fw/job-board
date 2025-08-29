import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { DeleteJobbtn } from "../lib/ui";
export function Deletepop({ jobId }: { jobId: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="font-bold text-lg rounded-full p-1 w-full outline-none shadow-md">
        :
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Job Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href={`/dashboard/jobs/${jobId}`}>Applicants</Link>
        </DropdownMenuItem>
        <DeleteJobbtn id={jobId} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
