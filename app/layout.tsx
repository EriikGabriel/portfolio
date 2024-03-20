import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";

import "./globals.css";

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
      <body className={GeistSans.className}>{children}</body>
    </html>
  );
}
