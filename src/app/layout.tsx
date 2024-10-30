"use client";

import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/side-nav/app-sidebar";
import { DynamicBreadcumb } from "@/components/dynamicBreadcumb";
import { title } from "process";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className={GeistMono.className} suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AppSidebar>{children}</AppSidebar>
        </ThemeProvider>
      </body>
    </html>
  );
}
