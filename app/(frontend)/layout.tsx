import { StarsBackground } from "@components/ui/effects/stars-background";
import { cn } from "@utils/cn";
import { siteMetadata, siteUrl } from "@utils/site";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata, Viewport } from "next";
import { Inter as inter } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import "./globals.css";

import { Header } from "@components/header";
import { MainContentGate } from "@components/main-content-gate";
import { MotionProvider } from "@components/providers/motion-provider";
import { SmoothScroll } from "@components/providers/smooth-scroll";
import { SplashScreen } from "@components/splash-screen";
import { LoadingProvider } from "@contexts/loading";
import { TooltipProvider } from "@ui/tooltip";

const Inter = inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
	metadataBase: new URL(siteUrl),
	title: siteMetadata.title,
	description: siteMetadata.description,
	keywords: [...siteMetadata.keywords],
	authors: [{ name: siteMetadata.name }],
	creator: siteMetadata.name,
	category: "technology",
	alternates: {
		canonical: "/",
	},
	openGraph: {
		type: "website",
		locale: siteMetadata.locale,
		url: "/",
		siteName: siteMetadata.title,
		title: siteMetadata.title,
		description: siteMetadata.description,
	},
	twitter: {
		card: "summary_large_image",
		title: siteMetadata.title,
		description: siteMetadata.description,
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
};

export const viewport: Viewport = {
	themeColor: "oklch(0.145 0.01 55)",
	colorScheme: "dark",
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
            <SmoothScroll>
              <MotionProvider>
                <TooltipProvider>
                  <div className="relative min-h-dvh">
                    <div className="pointer-events-none absolute inset-0 z-0">
                      <StarsBackground />
                    </div>

                    <SplashScreen />
                    <Header />
                    <MainContentGate>{children}</MainContentGate>
                  </div>
                </TooltipProvider>
              </MotionProvider>
            </SmoothScroll>
          </LoadingProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
