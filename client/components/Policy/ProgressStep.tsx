'use client'
import { Policy } from "@/app/interfaces/Policy/Policy";
import { 
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useState } from "react";

const ProgressStep = ({ policy, step, name }: { policy : Policy, step: number; name: string }) => {
    const [isTooltipOpen, setIsTooltipOpen] = useState(false);
    const isCompleted = policy.progresses.length >= step;
    const isCurrent = policy.progresses.length === step;
    
    return (
      <TooltipProvider>
        <Tooltip open={isTooltipOpen || isCurrent}>
          <TooltipTrigger
            className="h-full"
            onMouseEnter={() => setIsTooltipOpen(true)}
            onMouseLeave={() => setIsTooltipOpen(false)}
          >
            <div
              className={cn(
                "h-2 w-full rounded-full transition-all duration-300",
                isCompleted 
                  ? "bg-gradient-to-r from-emerald-400 to-emerald-500 dark:from-emerald-600 dark:to-emerald-700"
                  : "bg-gray-200 dark:bg-slate-300"
              )}
            />
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs">{name}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
};

export default ProgressStep;