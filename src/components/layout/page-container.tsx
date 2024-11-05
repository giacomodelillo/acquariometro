"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import GridPattern from "../ui/animated-grid-pattern";

export default function PageContainer({
  children,
  scrollable = true,
}: {
  children: React.ReactNode;
  scrollable?: boolean;
}) {
  return (
    <>
      {scrollable ? (
        <ScrollArea className="h-screen">
          <div className="h-full p-4 md:px-8">{children}</div>
          <GridPattern
            numSquares={50}
            maxOpacity={0.4}
            width={25}
            height={25}
            className={cn(
              "[mask-image:radial-gradient(circle_at_center,white,transparent)]",
              "inset-x-0 inset-y-[-30%] h-[200%] "
            )}
          />
        </ScrollArea>
      ) : (
        <div className="h-full p-4 md:px-8">{children}</div>
      )}
    </>
  );
}
// h-[calc(100dvh-52px)]
