"use client";

import { cn } from "@utils/cn";
import { motion } from "framer-motion";
import type React from "react";

export const Lamp = ({
	children,
	className,
	title,
	subtitle,
}: {
	children: React.ReactNode;
	className?: string;
	title?: string;
	subtitle?: string;
}) => {
	return (
		<div
			className={cn(
				"relative z-0 flex min-h-dvh w-full flex-col items-center overflow-hidden rounded-md bg-transparent",
				className,
			)}
		>
			{(title || subtitle) && (
				<div
					className="relative z-10 flex flex-col items-center gap-2 pt-4 pb-20 text-center font-medium tracking-tight"
					style={{ fontSize: "clamp(1.875rem, 5vw, 4.5rem)" }}
				>
					<div className="inline-flex h-fit items-center justify-center gap-3 md:gap-6 before:h-px before:w-10 md:before:w-20 before:bg-linear-to-l before:from-orange-500/60 before:content-[''] after:h-px after:w-10 md:after:w-20 after:bg-linear-to-r after:from-orange-500/60 after:content-['']">
						<span
							className="text-bright-primary tracking-wide"
							style={{ fontSize: "clamp(0.875rem, 2vw, 1.25rem)" }}
						>
							{subtitle}
						</span>
					</div>

					<h1
						className="text-bright-white tracking-wide"
						style={{ fontSize: "clamp(1.875rem, 4vw, 3rem)" }}
					>
						{title}
					</h1>
				</div>
			)}

			{/* Efeitos da lâmpada */}
			<div className="pointer-events-none absolute top-20 isolate z-0 mt-36 flex h-24 w-full items-center justify-center">
				<motion.div
					initial={{ opacity: 0.5, width: "15rem" }}
					whileInView={{ opacity: 1, width: "30rem" }}
					transition={{
						delay: 0.3,
						duration: 0.8,
						ease: "easeInOut",
					}}
					style={{
						backgroundImage:
							"conic-gradient(var(--conic-position), var(--tw-gradient-stops))",
					}}
					className="bg-gradient-conic absolute right-1/2 h-36 md:h-56 w-40 md:w-120 from-orange-500 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
				/>

				<motion.div
					initial={{ opacity: 0.5, width: "15rem" }}
					whileInView={{ opacity: 1, width: "30rem" }}
					transition={{
						delay: 0.3,
						duration: 0.8,
						ease: "easeInOut",
					}}
					style={{
						backgroundImage:
							"conic-gradient(var(--conic-position), var(--tw-gradient-stops))",
					}}
					className="bg-gradient-conic absolute left-1/2 h-36 md:h-56 w-40 md:w-120 from-transparent via-transparent to-orange-500 text-white [--conic-position:from_290deg_at_center_top]"
				/>

				<div className="absolute z-50 h-24 w-sm md:w-md -translate-y-1/2 rounded-full bg-orange-500 opacity-50 blur-2xl" />

				<motion.div
					initial={{ width: "15rem" }}
					whileInView={{ width: "30rem" }}
					transition={{
						delay: 0.3,
						duration: 0.8,
						ease: "easeInOut",
					}}
					className="absolute z-50 h-0.5 w-40 md:w-120 -translate-y-28 bg-orange-400"
				/>
			</div>

			{/* Conteúdo */}
			<div className="relative z-50 flex w-full flex-col items-center px-5">
				{children}
			</div>
		</div>
	);
};
