"use client";

import * as React from "react";
import {
  CloudCog,
  Droplets,
  Frame,
  LayoutDashboard,
  LifeBuoy,
  Send,
  Wrench,
} from "lucide-react";
import { NavMain } from "@/components/layout/side-nav/nav-main";
import { NavSecondary } from "@/components/layout/side-nav/nav-secondary";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dahboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: true,
      items: [],
    },
    {
      title: "Registro logs",
      url: "/dashboard/registro-logs",
      icon: CloudCog,
      isActive: true,
      items: [],
    },
    {
      title: "Gestione",
      url: "/dashboard/gestione",
      icon: Wrench,
      isActive: true,
      items: [],
    },
  ],
  navSecondary: [
    {
      title: "Documentazione",
      url: "/docs",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "https://github.com/giacomodelillo/acquariometro/issues",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
  ],
};

export const company = {
  name: "Acquariometro",
  logo: Droplets,
  plan: "v0.0.1",
};

export function AppSidebar({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex gap-2 py-2 text-sidebar-accent-foreground ">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <company.logo className="size-5 " />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">{company.name}</span>
              <span className="truncate text-xs">{company.plan}</span>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <NavMain items={data.navMain} />
          <NavSecondary items={data.navSecondary} />
        </SidebarContent>
      </Sidebar>
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
