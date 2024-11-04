"use client";

import { AppSidebar } from "@/components/layout/side-nav/app-sidebar";
import { SidebarInset } from "@/components/ui/sidebar";

export default function Dashboard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AppSidebar>{children}</AppSidebar>;
}
