"use client";
import localFont from "next/font/local";

import "./globals.css";
import { RootProvider } from "fumadocs-ui/provider";
import { Toaster } from "@/components/ui/toaster";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="it"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <body>
        <RootProvider
          theme={{
            enabled: true,
            defaultTheme: "dark",
          }}
        >
          {children}
        </RootProvider>
        <Toaster />
      </body>
    </html>
  );
}
