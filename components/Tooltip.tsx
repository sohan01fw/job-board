import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export function DisabledBtnTooltip({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="hover:cursor-pointer">{children}</div>
      </TooltipTrigger>
      <TooltipContent>
        <p>status is not open to work</p>
      </TooltipContent>
    </Tooltip>
  );
}

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
