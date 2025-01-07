"use client";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import GoogleIcon from "@/app/assets/google.png";
import Image from "next/image";
import { supabase } from "@/lib/supabase/supabase_client";
import { AuthError } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import useExportHooks from "./Hooks/useExportHooks";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { DeleteJobs } from "./Actions/Jobs";
import { JSX } from "react/jsx-runtime";
export function LoadingBtn(): JSX.Element {
  return (
    <Button disabled className="m-2">
      <Loader2 className="animate-spin" />
      Please wait
    </Button>
  );
}
export function GoogleButtonIcon(): JSX.Element {
  return (
    <Button className="w-full">
      <Image src={GoogleIcon} alt="google_logo" height={10} width={20} />
      Login with Google
    </Button>
  );
}
export function SignOut(): JSX.Element {
  async function signOut() {
    const { error }: { error: AuthError | null } =
      await supabase.auth.signOut();
    if (error) {
      throw new Error("error while logout user");
    } else {
      redirect("/auth/login");
    }
  }
  return <Button onClick={signOut}>logOut</Button>;
}

export function Applybtn({ id }: { id: string }): JSX.Element {
  const { router } = useExportHooks();
  async function apply() {
    return router.push(`/jobs/applyjob/${id}`);
  }
  return <Button onClick={apply}>Apply</Button>;
}

export function DeleteJobbtn({ id }: { id: string }): JSX.Element {
  async function handleDeleteJob() {
    const delJob = await DeleteJobs(id);
    if (delJob?.error === true) {
      alert("error while deleting job");
      console.log("error while deleting job");
    }
  }
  return <DropdownMenuItem onClick={handleDeleteJob}>Delete</DropdownMenuItem>;
}
