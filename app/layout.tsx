import { cn } from "@utils/cn";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { Inter as inter } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import "./globals.css";

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
		<html lang="pt-BR">
			<body
				className={cn(
					"min-h-dvh font-sans antialiased",
					GeistSans.variable,
					GeistSans.className,
					Inter.variable,
				)}
			>
				<NuqsAdapter>{children}</NuqsAdapter>
			</body>
		</html>
	);
}
