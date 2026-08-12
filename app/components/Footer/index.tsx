// biome-ignore-all lint/a11y/noStaticElementInteractions: Necessary for hover effect

"use client";

import {
	faGithub,
	faInstagram,
	faLinkedin,
	faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BackgroundBeamsWithCollision } from "@ui/background-beams-with-collision";
import LaserFlow from "@ui/laser-flow";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Logo } from "../Logo";

export function Footer() {
	const revealImgRef = useRef(null);

	return (
		<footer
			className="min-h-200 relative overflow-hidden"
			onMouseMove={(e) => {
				const rect = e.currentTarget.getBoundingClientRect();
				const x = e.clientX - rect.left;
				const y = e.clientY - rect.top;
				const el = revealImgRef.current;
				if (el) {
					const elImg = el as HTMLImageElement;
					elImg.style.setProperty("--mx", `${x}px`);
					elImg.style.setProperty("--my", `${y + rect.height * 0.5}px`);
				}
			}}
			onMouseLeave={() => {
				const el = revealImgRef.current;
				if (el) {
					const elImg = el as HTMLImageElement;
					elImg.style.setProperty("--mx", "-9999px");
					elImg.style.setProperty("--my", "-9999px");
				}
			}}
		>
			<BackgroundBeamsWithCollision className="h-full">
				<LaserFlow
					horizontalBeamOffset={0.1}
					color="#e36c0b"
					className="mix-blend-screen"
				/>
			</BackgroundBeamsWithCollision>

			<div
				id="beam-collision-target"
				className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[86%] h-[60%] bg-background rounded-[20px] border border-[#e36c0b] text-white text-[2rem] z-6 flex flex-col items-center justify-center pb-12 gap-4"
			>
				<Logo className="size-24 text-primary" />

				<nav className="*:text-lg *:text-primary *:p-2 flex gap-3">
					<Link href="/">Quem sou</Link>
					<Link href="/">Skills</Link>
					<Link href="/">Projetos</Link>
					<Link href="/">Conecte-se</Link>
				</nav>

				<div className="h-px w-3/4 bg-primary/20 border border-dashed" />

				<div className="text-primary font-geist-mono w-3/4 px-8 flex justify-between items-center">
					<span className="text-sm">Erik Gabriel © 2026</span>

					<div className="flex gap-4">
						<Link href="/" className="*:size-6!">
							<FontAwesomeIcon icon={faGithub} />
						</Link>
						<Link href="/" className="*:size-6!">
							<FontAwesomeIcon icon={faInstagram} />
						</Link>
						<Link href="/" className="*:size-6!">
							<FontAwesomeIcon icon={faXTwitter} />
						</Link>
						<Link href="/" className="*:size-6!">
							<FontAwesomeIcon icon={faLinkedin} />
						</Link>
					</div>
				</div>
			</div>

			<Image
				ref={revealImgRef}
				src="/assets/cover-pattern.png"
				alt="Reveal effect"
				width={1920}
				height={1080}
				className="absolute top-[-50%] z-5 w-full mix-blend-lighten opacity-30 pointer-events-none [--mx:-9999px] [--my:-9999px] [-webkit-mask-image:radial-gradient(circle_at_var(--mx)_var(--my),rgba(255,255,255,1)_0px,rgba(255,255,255,0.95)_60px,rgba(255,255,255,0.6)_120px,rgba(255,255,255,0.25)_180px,rgba(255,255,255,0)_240px)] mask-[radial-gradient(circle_at_var(--mx)_var(--my),rgba(255,255,255,1)_0px,rgba(255,255,255,0.95)_60px,rgba(255,255,255,0.6)_120px,rgba(255,255,255,0.25)_180px,rgba(255,255,255,0)_240px)] [-webkit-mask-repeat:no-repeat] mask-no-repeat"
			/>
		</footer>
	);
}
