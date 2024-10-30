"use client";

import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { RootProvider } from "fumadocs-ui/provider";
import { AppSidebar } from "@/components/layout/side-nav/app-sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className={GeistMono.className} suppressHydrationWarning>
      <body>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
