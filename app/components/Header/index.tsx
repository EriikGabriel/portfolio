"use client";

import { useLoading } from "@contexts/loading";
import SpecularButton from "@ui/specular-button";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { useEffect } from "react";
import { Logo } from "../Logo";
import { Motion } from "../Motion";

const navItems = [
	{
		label: "Quem sou",
		href: "#home",
	},
	{
		label: "Skills",
		href: "#skills",
	},
	{
		label: "Projetos",
		href: "#projects",
	},
	{
		label: "Conecte-se",
		href: "#contact",
	},
];

export function Header() {
	const { isLoading, headerLogoRef } = useLoading();

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

	return (
		<Motion
			as="header"
			style={{
				y,
				opacity,
			}}
			className="fixed inset-x-0 top-0 z-50 px-4 pt-4"
		>
			<div className="relative mx-auto h-16 max-w-6xl overflow-hidden rounded-2xl border border-neutral-200/20 bg-white/6 shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-2xl backdrop-saturate-150">
				<div className="pointer-events-none absolute inset-0 bg-white/2.5" />
				<div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/30 to-transparent" />
				{/* Conteúdo */}
				<div className="relative z-10 flex h-full items-center justify-between px-5">
					<button
						type="button"
						className="ml-2 flex h-9 w-9 items-center justify-center rounded-lg text-white md:hidden"
						aria-label="Abrir menu"
					>
						<svg
							aria-label="Abrir menu"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
						>
							<path d="M4 6h16" />
							<path d="M4 12h16" />
							<path d="M4 18h16" />
						</svg>
					</button>
					{/* Navegação */}
					<nav className="hidden items-center gap-6 md:flex">
						{navItems.map((item) => (
							<Link
								key={item.href}
								href={item.href}
								className="text-md text-white/60 transition-colors hover:text-primary"
							>
								{item.label}
							</Link>
						))}
					</nav>
					{/* Logo central */}
					<Link
						href="#home"
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
								width={48}
								height={48}
								className="text-neutral-400 hover:text-primary transition-colors h-12 w-12"
							/>
						</motion.div>
					</Link>
					<div className="ml-auto flex items-center">
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
	);
}
