"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";

const LoadingState = ({ className, ...props }: { className?: String }) => {
  return (
    <div className={cn("flex flex-row gap-1 items-center", className)}>
      <LoaderCircle className="animate-spin h-4" />
      Loading ...
    </div>
  );
};
LoadingState.displayName = "LoadingState";

const LoadingStateFull = ({ className, ...props }: { className?: String }) => {
  return (
    <div
      className={cn(
        "relative top-0 flex flex-col justify-center gap-1 items-center h-[50rem] rounded-lg bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 border ",
        className
      )}
    >
      <LoaderCircle className="animate-spin h-10" />
      Loading ...
    </div>
  );
};
LoadingStateFull.displayName = "LoadingStateFull";

export { LoadingState, LoadingStateFull };
