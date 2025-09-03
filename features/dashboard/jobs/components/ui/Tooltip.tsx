import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function EyeTooltip({ children }: { children: React.ReactNode }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost">{children}</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>view job details</p>
      </TooltipContent>
    </Tooltip>
  );
}
