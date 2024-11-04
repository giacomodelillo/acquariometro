"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    markers?: Array<number>;
  }
>(({ className, value, markers, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-2 w-full overflow-hidden rounded-full bg-secondary"
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={cn(
        "h-full w-full flex-1 bg-primary transition-all",
        className
      )}
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
    {markers ? (
      <div className="absolute top-0 left-0 w-full h-full">
        {markers.map((position, index) => (
          <div
            key={index}
            className="absolute top-0 h-full w-0.5 bg-current"
            style={{ left: `${position}%` }}
          />
        ))}
      </div>
    ) : null}
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
