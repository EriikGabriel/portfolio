/** biome-ignore-all lint/a11y/noStaticElementInteractions: No need for static element interactions in this context */
"use client";

import { cn } from "@utils/cn";

import { motion } from "framer-motion";
import type React from "react";
import { useState } from "react";

export const PinCard = ({
	children,
	title,
	href,
	className,
	containerClassName,
}: {
	children: React.ReactNode;
	title?: string;
	href?: string;
	className?: string;
	containerClassName?: string;
}) => {
	const [transform, setTransform] = useState(
		"translate(-50%,-50%) rotateX(0deg)",
	);

	const onMouseEnter = () => {
		setTransform("translate(-50%,-50%) rotateX(40deg) scale(0.8)");
	};
	const onMouseLeave = () => {
		setTransform("translate(-50%,-50%) rotateX(0deg) scale(1)");
	};

	return (
		<div
			className={cn(
				"group/pin relative z-50 w-fit cursor-pointer",
				containerClassName,
			)}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			// href={href || "/"}
		>
			<div
				style={{
					perspective: "1000px",
					transform: "rotateX(70deg) translateZ(0deg)",
				}}
				className="absolute left-1/2 top-1/2 ml-[0.09375rem] mt-4 -translate-x-1/2 -translate-y-1/2"
			>
				<div
					style={{
						transform: transform,
					}}
					className="absolute left-1/2 top-1/2 flex items-start justify-start overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/60 p-4 shadow-[0_8px_16px_rgb(0_0_0/0.4)] backdrop-blur-md transition duration-700 group-hover/pin:border-white/20"
				>
					<div className={cn("relative z-50 ", className)}>{children}</div>
				</div>
			</div>
			<PinPerspective title={title} href={href} />
		</div>
	);
};

export const PinPerspective = ({
	title,
	href,
}: {
	title?: string;
	href?: string;
}) => {
	return (
		<motion.div className="pointer-events-none z-60 flex h-80 w-fit items-center justify-center opacity-0 transition duration-500 group-hover/pin:opacity-100">
			<div className="inset-0 -mt-7 h-full w-full flex-none">
				<div className="absolute inset-x-0 top-0 flex justify-center">
					<a
						href={href}
						target={"_blank"}
						className="relative z-10 flex items-center space-x-2 rounded-full bg-zinc-950 px-4 py-0.5 ring-1 ring-white/10 "
						rel="noopener"
					>
						<span className="relative z-20 inline-block py-0.5 text-xs font-bold tracking-normal text-white">
							{title}
						</span>

						<span className="absolute bottom-0 left-4.5 h-px w-[calc(100%-2.25rem)] bg-linear-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover/btn:opacity-40"></span>
					</a>
				</div>

				<div
					style={{
						perspective: "1000px",
						transform: "rotateX(70deg) translateZ(0)",
					}}
					className="absolute left-1/2 top-1/2 ml-[0.09375rem] mt-4 -translate-x-1/2 -translate-y-1/2"
				>
					<motion.div
						initial={{
							opacity: 0,
							scale: 0,
							x: "-50%",
							y: "-50%",
						}}
						animate={{
							opacity: [0, 1, 0.5, 0],
							scale: 1,

							z: 0,
						}}
						transition={{
							duration: 6,
							repeat: Infinity,
							delay: 0,
						}}
						className="absolute left-1/2 top-1/2  h-45 w-45 rounded-[50%] bg-orange-500/8 shadow-[0_8px_16px_rgb(0_0_0/0.4)]"
					></motion.div>
					<motion.div
						initial={{
							opacity: 0,
							scale: 0,
							x: "-50%",
							y: "-50%",
						}}
						animate={{
							opacity: [0, 1, 0.5, 0],
							scale: 1,

							z: 0,
						}}
						transition={{
							duration: 6,
							repeat: Infinity,
							delay: 2,
						}}
						className="absolute left-1/2 top-1/2  h-45 w-45 rounded-[50%] bg-orange-500/8 shadow-[0_8px_16px_rgb(0_0_0/0.4)]"
					></motion.div>
					<motion.div
						initial={{
							opacity: 0,
							scale: 0,
							x: "-50%",
							y: "-50%",
						}}
						animate={{
							opacity: [0, 1, 0.5, 0],
							scale: 1,

							z: 0,
						}}
						transition={{
							duration: 6,
							repeat: Infinity,
							delay: 4,
						}}
						className="absolute left-1/2 top-1/2  h-45 w-45 rounded-[50%] bg-orange-500/8 shadow-[0_8px_16px_rgb(0_0_0/0.4)]"
					></motion.div>
				</div>

				<motion.div className="absolute bottom-1/2 right-1/2 h-20 w-px translate-y-3.5 bg-linear-to-b from-transparent to-orange-500 blur-[2px] group-hover/pin:h-40" />
				<motion.div className="absolute bottom-1/2 right-1/2 h-20 w-px translate-y-3.5 bg-linear-to-b from-transparent to-orange-500 group-hover/pin:h-40  " />
				<motion.div className="absolute bottom-1/2 right-1/2 z-40 h-1 w-1 translate-x-[1.5px] translate-y-3.5 rounded-full bg-orange-600 blur-[3px]" />
				<motion.div className="absolute bottom-1/2 right-1/2 z-40 h-0.5 w-0.5 translate-x-[0.5px] translate-y-3.5 rounded-full bg-orange-300 " />
			</div>
		</motion.div>
	);
};
