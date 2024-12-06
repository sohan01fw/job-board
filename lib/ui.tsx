import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import GoogleIcon from "@/app/assets/google.png";
import Image from "next/image";
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
