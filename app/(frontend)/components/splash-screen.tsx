"use client";

import { useLoading } from "@contexts/loading";
import { LOGO_PATHS } from "@utils/logo";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

const SPLASH_DURATION_MS = 3500;
const FLIGHT_DURATION_S = 0.8;
const SPLASH_FAILSAFE_MS = SPLASH_DURATION_MS + FLIGHT_DURATION_S * 1000 + 1500;

const pathTransitions = [
	{ duration: 1.8, delay: 0.3, ease: "easeInOut" },
	{ duration: 1.8, delay: 0.5, ease: "easeInOut" },
	{ duration: 1.4, delay: 0.1, ease: "easeInOut" },
] as const;

export function SplashScreen() {
	const { isLoading, setIsLoading, headerLogoRef } = useLoading();
	const [isLeaving, setIsLeaving] = useState(false);
	const wrapperRef = useRef<HTMLDivElement>(null);
	const controls = useAnimation();
	const hasCompletedRef = useRef(false);

	const complete = useCallback(() => {
		if (hasCompletedRef.current) return;
		hasCompletedRef.current = true;
		document.body.style.overflow = "";
		setIsLoading(false);
	}, [setIsLoading]);

	useEffect(() => {
		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";

		const leaveTimeout = setTimeout(
			() => setIsLeaving(true),
			SPLASH_DURATION_MS,
		);
		const failsafeTimeout = setTimeout(complete, SPLASH_FAILSAFE_MS);

		return () => {
			clearTimeout(leaveTimeout);
			clearTimeout(failsafeTimeout);
			document.body.style.overflow = previousOverflow;
		};
	}, [complete]);

	useEffect(() => {
		if (!isLeaving || hasCompletedRef.current) return;

		// rAF is paused in hidden tabs — finish immediately instead of freezing.
		if (document.visibilityState === "hidden") {
			complete();
			return;
		}

		const originEl = wrapperRef.current;
		const targetEl = headerLogoRef.current;

		if (!originEl || !targetEl) {
			complete();
			return;
		}

		const originRect = originEl.getBoundingClientRect();
		const targetRect = targetEl.getBoundingClientRect();

		const deltaX =
			targetRect.left +
			targetRect.width / 2 -
			(originRect.left + originRect.width / 2);
		const deltaY =
			targetRect.top +
			targetRect.height / 2 -
			(originRect.top + originRect.height / 2);
		const scale = targetRect.width / originRect.width;

		controls
			.start({
				x: deltaX,
				y: deltaY,
				scale,
				transition: { duration: FLIGHT_DURATION_S, ease: [0.65, 0, 0.35, 1] },
			})
			.then(complete, complete);
	}, [isLeaving, controls, headerLogoRef, complete]);

	return (
		<AnimatePresence>
			{isLoading && (
				<>
					<motion.div
						key="splash-bg"
						exit={{
							opacity: 0,
							transition: { duration: 0.4, ease: "easeInOut" },
						}}
						className="fixed inset-0 z-999 bg-background"
					/>

					<div className="pointer-events-none fixed inset-0 z-1000 flex items-center justify-center">
						<motion.div
							ref={wrapperRef}
							animate={controls}
							initial={{ x: 0, y: 0, scale: 1 }}
							className="h-29.5 w-35"
						>
							<svg
								aria-label="Logo"
								viewBox="0 0 239 203"
								width={140}
								height={118}
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								className="text-neutral-100"
								aria-hidden
							>
								{LOGO_PATHS.map((d, i) => (
									<motion.path
										key={d.slice(0, 10)}
										d={d}
										stroke="#a1a1a1"
										strokeWidth={1.4}
										initial={{ opacity: 0, pathLength: 0 }}
										animate={{ opacity: 1, pathLength: 0.5 }}
										transition={pathTransitions[i]}
									/>
								))}
							</svg>
						</motion.div>
					</div>
				</>
			)}
		</AnimatePresence>
	);
}
