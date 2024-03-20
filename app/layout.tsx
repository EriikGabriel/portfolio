import type { Metadata } from "next";
import { Inter as inter } from "next/font/google";

import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { cn } from "./lib/utils";

const Inter = inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Erik Gabriel | Fullstack & Game Developer",
  description: "Sou Fullstack & Game Developer.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body
        className={cn("min-h-dvh font-sans antialiased", GeistSans.className)}
      >
        {children}
      </body>
    </html>
  );
}
