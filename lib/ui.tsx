"use client";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import GoogleIcon from "@/app/assets/google.png";
import Image from "next/image";
import { supabase } from "@/lib/supabase/supabase_client";
import { AuthError } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
export function LoadingBtn() {
  return (
    <Button disabled className="m-2">
      <Loader2 className="animate-spin" />
      Please wait
    </Button>
  );
}
export function GoogleButtonIcon() {
  return (
    <Button className="w-full">
      <Image src={GoogleIcon} alt="google_logo" height={10} width={20} />
      Login with Google
    </Button>
  );
}
export function SignOut() {
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
