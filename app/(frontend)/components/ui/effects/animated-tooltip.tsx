/** biome-ignore-all lint/a11y/noStaticElementInteractions: Necessary for tooltip interaction */
"use client";

import {
	AnimatePresence,
	motion,
	useMotionValue,
	useSpring,
	useTransform,
} from "motion/react";

import type React from "react";
import { useRef } from "react";

interface AnimatedTooltipProps {
	items: {
		id: number;
		title: string;
		desc: string;
		url?: string;
	}[];
	children?: React.ReactNode;
	hover: {
		index: number | null;
		setIndex: React.Dispatch<React.SetStateAction<number | null>>;
	};
}

export const AnimatedTooltip = ({
	items,
	hover,
	children,
}: AnimatedTooltipProps) => {
	const springConfig = { stiffness: 100, damping: 15 };
	const x = useMotionValue(0);
	const animationFrameRef = useRef<number | null>(null);

	const rotate = useSpring(
		useTransform(x, [-100, 100], [-45, 45]),
		springConfig,
	);
	const translateX = useSpring(
		useTransform(x, [-100, 100], [-50, 50]),
		springConfig,
	);

	const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
		if (animationFrameRef.current) {
			cancelAnimationFrame(animationFrameRef.current);
		}

		animationFrameRef.current = requestAnimationFrame(() => {
			const eventTarget = event.target as HTMLDivElement;

			const halfWidth = eventTarget.offsetWidth / 2;
			x.set(event.nativeEvent.offsetX - halfWidth);
		});
	};

	return (
		<>
			{items.map((item) => (
				<div
					className="group relative -mr-4"
					key={item.title}
					onMouseEnter={() => hover.setIndex(item.id)}
					onMouseLeave={() => hover.setIndex(null)}
				>
					<AnimatePresence>
						{hover.index === item.id && (
							<motion.div
								initial={{ opacity: 0, y: 20, scale: 0.6 }}
								animate={{
									opacity: 1,
									y: -120,
									scale: 1,
									transition: {
										type: "spring",
										stiffness: 260,
										damping: 10,
									},
								}}
								exit={{ opacity: 0, y: 20, scale: 0.6 }}
								style={{
									translateX: translateX,
									rotate: rotate,
									whiteSpace: "nowrap",
								}}
								className="absolute -top-16 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center justify-center rounded-md bg-neutral-500/40 border border-b-0 backdrop-blur-2xl border-neutral-400 px-4 py-2 text-xs shadow-xl"
							>
								<div className="relative z-30 text-base font-bold text-white">
									{item.title}
								</div>
								<div className="text-xs text-white">{item.desc}</div>
							</motion.div>
						)}
					</AnimatePresence>
					{/*{item.url && (
						<Image
							onMouseMove={handleMouseMove}
							height={100}
							width={100}
							src={item.url}
							alt={item.title}
							className="relative m-0! h-14 w-14 rounded-full border-2 border-white object-cover object-top p-0! transition duration-500 group-hover:z-30 group-hover:scale-105"
						/>
					)}*/}
					<div className="w-16 md:w-20" onMouseMove={handleMouseMove}>
						{children}
					</div>
				</div>
			))}
		</>
	);
};
