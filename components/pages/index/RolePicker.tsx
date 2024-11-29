import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export function RolePicker() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg" variant="default" className="rounded-[5px]">
          Job
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle>Who you are?</DialogTitle>
          <DialogDescription>select the role for you</DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
          </div>
          <div className="flex gap-2">
            <Link href="/jobs">
              <Button size="sm" className="px-3">
                <span className="">Applicant</span>
              </Button>
            </Link>

            <Link href="/dashboard">
              <Button size="sm" className="px-3">
                <span className="">Recruiter</span>
              </Button>
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
