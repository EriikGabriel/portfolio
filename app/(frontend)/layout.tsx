import { StarsBackground } from "@components/ui/stars-background";
import { cn } from "@utils/cn";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { Inter as inter } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import "./globals.css";

import { Header } from "@components/header";
import { MainContentGate } from "@components/main-content-gate";
import { SplashScreen } from "@components/splash-screen";
import { LoadingProvider } from "@contexts/loading";

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
					GeistMono.variable,
				)}
			>
				<NuqsAdapter>
					<LoadingProvider>
						<div className="relative min-h-dvh">
							<div className="pointer-events-none absolute inset-0 z-0">
								<StarsBackground />
							</div>

							<SplashScreen />
							<Header />
							<MainContentGate>{children}</MainContentGate>
						</div>
					</LoadingProvider>
				</NuqsAdapter>
			</body>
		</html>
	);
}
