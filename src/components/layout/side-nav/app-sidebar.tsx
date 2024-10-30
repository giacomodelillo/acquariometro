"use client";

import * as React from "react";
import {
  BookOpen,
  Bot,
  ChartNoAxesColumn,
  CloudCog,
  Command,
  Database,
  Frame,
  LayoutDashboard,
  LifeBuoy,
  Map,
  PieChart,
  Rocket,
  Send,
  Settings,
  Settings2,
  SquareTerminal,
  Usb,
  User,
  Wrench,
} from "lucide-react";
import Image from "next/image";
import { NavMain } from "@/components/layout/side-nav/nav-main";
import { NavProjects } from "@/components/layout/side-nav/nav-projects";
import { NavSecondary } from "@/components/layout/side-nav/nav-secondary";
import { NavUser } from "@/components/layout/side-nav/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Separator } from "../../ui/separator";
import { RandomEmoji, RandomWelcomePhrases } from "@/components/random-data";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dahboard",
      url: "/",
      icon: LayoutDashboard,
      isActive: true,
      items: [],
    },
    {
      title: "Registro logs",
      url: "/",
      icon: CloudCog,
      isActive: true,
      items: [],
    },
    {
      title: "Gestione",
      url: "/",
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
      url: "#",
      icon: Send,
    },
    {
      title: "Impostazioni",
      url: "/settings",
      icon: Settings,
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

export function AppSidebar({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <Link href="/">
                  <div className="flex aspect-square size-9 items-center justify-center ">
                    <Image src="/logo.png" alt="logo" width={24} height={24} />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      Acquariometro
                    </span>
                    <span className="truncate text-xs">Project</span>
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <NavMain items={data.navMain} />
          {/* <NavProjects projects={data.projects} /> */}
          <blockquote className="mx-2 p-2 text-sm italic bg-muted rounded-lg text-muted-foreground border">
            <RandomWelcomePhrases /> <RandomEmoji />
          </blockquote>
          <NavSecondary items={data.navSecondary} className="mt-auto" />
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={data.user} />
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
