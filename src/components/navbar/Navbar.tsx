"use client";

import Link from "next/link";
import { CircleUser, Menu, Package2, Search } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Input } from "@/components/ui/input";
import { ModeToggle } from "../mode-toggle";

export function Navbar({ children }: any) {
  const currentPath = usePathname();
  return (
    <div className="flex min-h-screen w-full flex-col ">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b  px-4 md:px-6 z-50 border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <Package2 className="h-6 w-6" />
          </Link>
          <Link
            href="/"
            className={
              currentPath === "/"
                ? "text-foreground"
                : "text-muted-foreground" +
                  " transition-colors hover:text-foreground"
            }
          >
            Dashboard
          </Link>
          <Link
            href="/settings"
            className={
              currentPath === "/settings"
                ? "text-foreground"
                : "text-muted-foreground" +
                  " transition-colors hover:text-foreground"
            }
          >
            Settings
          </Link>
        </nav>

        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <ModeToggle classes="ml-auto flex-1 sm:flex-initial" />
        </div>
      </header>
      {children}
    </div>
  );
}
