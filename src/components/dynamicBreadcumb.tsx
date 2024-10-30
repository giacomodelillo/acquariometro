"use client";

import { Slash } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function DynamicBreadcumb({
  items,
}: {
  items: {
    title: string;
    url: string;
  }[];
}) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item) => (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink href={item.url}>{item.title}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <Slash />
            </BreadcrumbSeparator>
          </>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
