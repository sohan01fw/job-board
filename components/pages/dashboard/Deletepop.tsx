import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteJobbtn } from "@/lib/ui";
import Link from "next/link";
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
