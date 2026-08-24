"use client";

import { useLoading } from "@contexts/loading";
import SpecularButton from "@ui/specular-button";
import { navItems, scrollToSection } from "@utils/nav";
import { lenisRef } from "@utils/lenis";
import {
	AnimatePresence,
	motion,
	useMotionValue,
	useSpring,
	useTransform,
} from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "./logo";
import { Motion } from "./motion";

export function Header() {
	const { isLoading, headerLogoRef } = useLoading();
	const [mobileOpen, setMobileOpen] = useState(false);

	const scroll = useMotionValue(0);
	const smoothScroll = useSpring(scroll, {
		stiffness: 280,
		damping: 38,
		mass: 0.8,
	});
	const y = useTransform(smoothScroll, [0, 80], [0, -80]);
	const opacity = useTransform(smoothScroll, [0, 40, 80], [1, 0.95, 0]);

	useEffect(() => {
		let lastScrollY = window.scrollY;
		const handleScroll = () => {
			const currentScrollY = window.scrollY;
			const delta = currentScrollY - lastScrollY;
			lastScrollY = currentScrollY;
			if (currentScrollY <= 0) {
				scroll.set(0);
				return;
			}
			scroll.set(Math.max(0, Math.min(80, scroll.get() + delta)));
		};
		window.addEventListener("scroll", handleScroll, {
			passive: true,
		});
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [scroll]);

	useEffect(() => {
		if (!mobileOpen) return;

		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";

		const lenis = lenisRef.current;
		lenis?.stop();

		return () => {
			document.body.style.overflow = previousOverflow;
			if (!isLoading) lenis?.start();
		};
	}, [mobileOpen, isLoading]);

	return (
		<header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-4 md:pt-4">
			<Motion
				style={{ y, opacity }}
				className="mx-auto w-full md:max-w-6xl will-change-transform"
			>
				<div className="relative h-14 md:h-16 w-full rounded-2xl border border-neutral-200/20 bg-white/6 shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-2xl backdrop-saturate-150">
					<div className="pointer-events-none absolute inset-0 bg-white/2.5" />
					<div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/30 to-transparent" />
					<div className="relative z-10 flex h-full items-center justify-between px-4 md:px-5">
						<button
							type="button"
							className="flex h-9 w-9 items-center justify-center rounded-lg text-white md:hidden"
							aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
							onClick={() => setMobileOpen((prev) => !prev)}
						>
							<svg
								aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
								aria-hidden
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
							>
								{/* Linha de cima -> vira o traço "\" do X */}
								<motion.path
									initial={false}
									animate={{ d: mobileOpen ? "M18 6 6 18" : "M4 6h16" }}
									transition={{ duration: 0.3, ease: "easeInOut" }}
								/>
								{/* Linha do meio -> só desaparece */}
								<motion.path
									initial={false}
									d="M4 12h16"
									animate={{ opacity: mobileOpen ? 0 : 1 }}
									transition={{ duration: 0.15, ease: "easeInOut" }}
								/>
								{/* Linha de baixo -> vira o traço "/" do X */}
								<motion.path
									initial={false}
									animate={{ d: mobileOpen ? "M6 6 18 18" : "M4 18h16" }}
									transition={{ duration: 0.3, ease: "easeInOut" }}
								/>
							</svg>
						</button>

						<nav className="hidden items-center gap-6 md:flex">
							{navItems.map((item) => (
								<button
									key={item.id}
									type="button"
									onClick={() => scrollToSection(item.id)}
									className="text-xs lg:text-sm text-white/60 transition-colors hover:text-primary"
								>
									{item.label}
								</button>
							))}
						</nav>

						<Link
							href="/"
							className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
							aria-label="Voltar para o início"
						>
							<motion.div
								initial={false}
								animate={{ opacity: isLoading ? 0 : 1 }}
								transition={{ duration: 0.35, ease: "easeInOut" }}
							>
								<Logo
									ref={headerLogoRef}
									width={40}
									height={40}
									className="text-neutral-400 hover:text-primary transition-colors h-10 w-10 md:h-12 md:w-12"
								/>
							</motion.div>
						</Link>
						<div className="ml-auto hidden md:flex items-center">
							<SpecularButton
								radius={10}
								className="h-6 bg-neutral-900/10! text-sm! text-white/60"
							>
								Currículo
							</SpecularButton>
						</div>
					</div>
				</div>
			</Motion>

			<AnimatePresence>
				{mobileOpen && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "auto" }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.25, ease: "easeInOut" }}
						className="md:hidden mt-2 mx-auto w-full md:max-w-6xl overflow-hidden rounded-2xl border border-neutral-200/20 bg-neutral-700/40 backdrop-blur-2xl"
					>
						<nav className="flex flex-col items-center gap-1 p-4">
							{navItems.map((item) => (
								<button
									key={item.id}
									type="button"
									onClick={() => {
										scrollToSection(item.id);
										setMobileOpen(false);
									}}
									className="w-full rounded-lg py-3 text-center text-xs sm:text-sm text-white/60 transition-colors hover:bg-white/5 hover:text-primary"
								>
									{item.label}
								</button>
							))}
							<div className="mt-2 w-full">
								<SpecularButton
									radius={10}
									className="h-8 w-full bg-neutral-900/10! text-sm! text-white/60"
								>
									Currículo
								</SpecularButton>
							</div>
						</nav>
					</motion.div>
				)}
			</AnimatePresence>
		</header>
	);
}
