/** biome-ignore-all lint/a11y/noStaticElementInteractions: Necessary for 3D pin effect */
"use client";

import { cn } from "@utils/cn";
import { motion } from "motion/react";
import type React from "react";
import { useState } from "react";

export const PinContainer = ({
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
			className={cn("relative group/pin z-10", containerClassName)}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
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
					className="absolute left-1/2 p-4 top-1/2 flex justify-start items-start rounded-2xl shadow-[0_8px_32px_rgb(0_0_0/0.5)] bg-neutral-300/10 backdrop-blur-3xl border border-white/25 ring-1 ring-white/10 group-hover/pin:border-orange-200/60 group-hover/pin:bg-white/15 transition duration-700 overflow-hidden"
				>
					<div className={cn(" relative z-50 ", className)}>{children}</div>
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
		<motion.div className="pointer-events-none w-96 h-80 flex items-center justify-center opacity-0 group-hover/pin:opacity-100 z-60 transition duration-500">
			<div className=" w-full h-full -mt-7 flex-none  inset-0">
				<div className="absolute top-0 inset-x-0  flex justify-center">
					<a
						href={href}
						target={"_blank"}
						className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 "
						rel="noopener"
					>
						<span className="relative z-20 text-white text-xs tracking-normal font-bold inline-block py-0.5">
							{title}
						</span>

						<span className="absolute bottom-0 left-4.5 h-px w-[calc(100%-2.25rem)] bg-linear-to-r from-emerald-400/0 via-orange-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover/btn:opacity-40"></span>
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
						className="absolute left-1/2 top-1/2  h-45 w-45 rounded-[50%] bg-orange-400/12 shadow-[0_8px_16px_rgb(0_0_0/0.4)]"
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
						className="absolute left-1/2 top-1/2  h-45 w-45 rounded-[50%] bg-orange-400/12 shadow-[0_8px_16px_rgb(0_0_0/0.4)]"
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
						className="absolute left-1/2 top-1/2  h-45 w-45 rounded-[50%] bg-orange-400/12 shadow-[0_8px_16px_rgb(0_0_0/0.4)]"
					></motion.div>
				</div>

				<motion.div className="absolute right-1/2 bottom-1/2 bg-linear-to-b from-transparent to-orange-500 translate-y-3.5 w-px h-20 group-hover/pin:h-40 blur-[2px]" />
				<motion.div className="absolute right-1/2 bottom-1/2 bg-linear-to-b from-transparent to-orange-500 translate-y-3.5 w-px h-20 group-hover/pin:h-40  " />
				<motion.div className="absolute right-1/2 translate-x-[1.5px] bottom-1/2 bg-orange-600 translate-y-3.5 w-1 h-1 rounded-full z-40 blur-[3px]" />
				<motion.div className="absolute right-1/2 translate-x-[0.5px] bottom-1/2 bg-orange-300 translate-y-3.5 w-0.5 h-0.5 rounded-full z-40 " />
			</div>
		</motion.div>
	);
};
