// biome-ignore-all lint/a11y/noStaticElementInteractions: Necessary for hover effect

"use client";

import { Icon } from "@iconify/react";
import { BackgroundBeamsWithCollision } from "@ui/background-beams-with-collision";
import LaserFlow from "@ui/laser-flow";
import { navItems, scrollToSection } from "@utils/nav";
import { socialMedias } from "@utils/social";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Logo } from "./logo";

export function Footer() {
	const revealImgRef = useRef<HTMLImageElement>(null);

	const handleMouseMove = (e: React.MouseEvent) => {
		const rect = e.currentTarget.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		const el = revealImgRef.current;

		if (el) {
			el.style.setProperty("--mx", `${x}px`);
			el.style.setProperty("--my", `${y + rect.height * 0.5}px`);
		}
	};

	const handleMouseLeave = () => {
		const el = revealImgRef.current;

		if (el) {
			el.style.setProperty("--mx", "-9999px");
			el.style.setProperty("--my", "-9999px");
		}
	};

	return (
		<footer
			className="relative min-h-114 md:min-h-208 overflow-hidden pb-20 md:pb-52"
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
		>
			<BackgroundBeamsWithCollision className="absolute inset-0 min-h-full">
				<LaserFlow
					horizontalBeamOffset={0.1}
					color="#e36c0b"
					className="mix-blend-screen"
				/>
			</BackgroundBeamsWithCollision>

			<div
				id="beam-collision-target"
				className="absolute top-1/2 left-1/2 z-6 flex h-[75%] md:h-[60%] w-[95%] md:w-[86%] -translate-x-1/2 flex-col items-center justify-center gap-2 md:gap-4 rounded-xl md:rounded-[20px] border border-[#e36c0b] bg-background pb-4 md:pb-12 px-4 text-white"
				style={{ fontSize: "clamp(0.875rem, 2vw, 2rem)" }}
			>
				<Logo className="size-12 md:size-24 text-primary" />

				<nav
					className="flex flex-wrap justify-center gap-1 md:gap-3 *:p-0.5 md:*:p-2 *:text-primary"
					style={{ fontSize: "clamp(0.8rem, 2.5vw, 1.125rem)" }}
				>
					{navItems.map((item) => (
						<button
							key={item.id}
							type="button"
							onClick={() => scrollToSection(item.id)}
						>
							{item.label}
						</button>
					))}
				</nav>

				<div className="h-px w-3/4 border border-dashed bg-primary/20" />

				<div className="flex w-full md:w-3/4 items-center justify-between px-2 md:px-8 font-geist-mono text-primary">
					<span style={{ fontSize: "clamp(0.65rem, 1.8vw, 0.875rem)" }}>
						Erik Gabriel © 2026
					</span>

					<div className="flex gap-2 md:gap-4">
						{socialMedias.map((media) => (
							<Link
								key={media.name}
								href={media.url}
								className="*:size-3.5 md:*:size-6!"
								target="_blank"
								rel="noopener noreferrer"
							>
								<Icon icon={media.icon} />
							</Link>
						))}
					</div>
				</div>
			</div>

			<Image
				ref={revealImgRef}
				src="/assets/cover-pattern.png"
				alt="Reveal effect"
				width={1920}
				height={1080}
				className="pointer-events-none absolute top-[-50%] z-5 w-full opacity-30 mix-blend-lighten [--mx:-9999px] [--my:-9999px] [-webkit-mask-image:radial-gradient(circle_at_var(--mx)_var(--my),rgba(255,255,255,1)_0px,rgba(255,255,255,0.95)_60px,rgba(255,255,255,0.6)_120px,rgba(255,255,255,0.25)_180px,rgba(255,255,255,0)_240px)] [-webkit-mask-repeat:no-repeat] mask-[radial-gradient(circle_at_var(--mx)_var(--my),rgba(255,255,255,1)_0px,rgba(255,255,255,0.95)_60px,rgba(255,255,255,0.6)_120px,rgba(255,255,255,0.25)_180px,rgba(255,255,255,0)_240px)] mask-no-repeat"
			/>
		</footer>
	);
}
