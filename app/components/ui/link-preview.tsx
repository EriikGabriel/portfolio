"use client";

import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import { cn } from "@utils/cn";
import {
	AnimatePresence,
	motion,
	useMotionValue,
	useSpring,
} from "motion/react";
import Image from "next/image";
import { encode } from "qss";
import React from "react";

type LinkPreviewProps = {
	children: React.ReactNode;
	url: string;
	hover: {
		index: number | null;
		setIndex: React.Dispatch<React.SetStateAction<number | null>>;
	};
	className?: string;
	width?: number;
	height?: number;
	quality?: number;
	layout?: string;
} & (
	| {
			isStatic: true;
			imageSrc: string;
	  }
	| {
			isStatic?: false;
			imageSrc?: never;
	  }
);

export const LinkPreview = ({
	children,
	url,
	className,
	width = 200,
	height = 125,
	isStatic = false,
	imageSrc,
	hover,
}: LinkPreviewProps) => {
	const [isOpen, setOpen] = React.useState(false);

	const springConfig = {
		stiffness: 100,
		damping: 15,
	};

	const x = useMotionValue(0);
	const translateX = useSpring(x, springConfig);

	const src = React.useMemo(() => {
		if (isStatic) {
			return imageSrc;
		}

		const params = encode({
			url,
			screenshot: true,
			meta: false,
			embed: "screenshot.url",
			colorScheme: "dark",
			"viewport.isMobile": true,
			"viewport.deviceScaleFactor": 1,
			"viewport.width": width * 3,
			"viewport.height": height * 3,
		});

		return `https://api.microlink.io/?${params}`;
	}, [isStatic, imageSrc, url, width, height]);

	const handleMouseMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
		const targetRect = event.currentTarget.getBoundingClientRect();
		const eventOffsetX = event.clientX - targetRect.left;
		const offsetFromCenter = (eventOffsetX - targetRect.width / 2) / 2;

		x.set(offsetFromCenter);
	};

	return (
		<HoverCardPrimitive.Root
			openDelay={50}
			closeDelay={100}
			onOpenChange={setOpen}
		>
			<HoverCardPrimitive.Trigger
				onMouseMove={handleMouseMove}
				className={cn("text-white", className)}
				href={url}
			>
				{children}
			</HoverCardPrimitive.Trigger>

			<HoverCardPrimitive.Content
				className="origin-(--radix-hover-card-content-transform-origin) pb-3"
				side="top"
				align="center"
				onMouseEnter={() => hover.setIndex(hover.index)}
				onMouseLeave={() => hover.setIndex(null)}
			>
				<AnimatePresence>
					{isOpen && (
						<motion.div
							initial={{
								opacity: 0,
								y: 20,
								scale: 0.6,
							}}
							animate={{
								opacity: 1,
								y: 0,
								scale: 1,
								transition: {
									type: "spring",
									stiffness: 260,
									damping: 20,
								},
							}}
							exit={{
								opacity: 0,
								y: 20,
								scale: 0.6,
							}}
							className="rounded-xl shadow-xl"
							style={{
								x: translateX,
							}}
						>
							<a
								href={url}
								className="block rounded-xl bg-neutral-400 p-1 shadow hover:border-neutral-200 dark:hover:border-neutral-800"
								style={{
									fontSize: 0,
									width,
									height,
								}}
							>
								<div className="relative size-full overflow-hidden rounded-lg">
									<Image
										src={src ?? ""}
										alt="preview image"
										fill
										sizes={`${width}px`}
										className="object-cover"
									/>
								</div>
							</a>
						</motion.div>
					)}
				</AnimatePresence>
			</HoverCardPrimitive.Content>
		</HoverCardPrimitive.Root>
	);
};
