import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
export function LoadingBtn() {
  return (
    <Button disabled className="m-2">
      <Loader2 className="animate-spin" />
      Please wait
    </Button>
  );
}
