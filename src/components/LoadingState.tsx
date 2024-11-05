"use client";

import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";

export default function LoadingState({
  className,
  ...props
}: {
  className?: String;
}) {
  return (
    <div className={cn("flex flex-row gap-1 items-center", className)}>
      <LoaderCircle className="animate-spin h-4" />
      Loading ...
    </div>
  );
}

export { LoadingState };
