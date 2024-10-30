"use client";

import { AppSidebar } from "@/components/layout/side-nav/app-sidebar";

export default function Dashboard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AppSidebar>{children}</AppSidebar>;
}
