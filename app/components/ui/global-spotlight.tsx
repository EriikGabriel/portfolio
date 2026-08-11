/** biome-ignore-all lint/suspicious/useIterableCallbackReturn: Necessary for each  */

"use client";

import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";

const DEFAULT_SPOTLIGHT_RADIUS = 300;
const DEFAULT_GLOW_COLOR = "238, 194, 159";
const MOBILE_BREAKPOINT = 768;

const calculateSpotlightValues = (radius: number) => ({
	proximity: radius * 0.5,
	fadeDistance: radius * 0.75,
});

const updateCardGlowProperties = (
	card: HTMLElement,
	mouseX: number,
	mouseY: number,
	glow: number,
	radius: number,
) => {
	const rect = card.getBoundingClientRect();
	const relativeX = ((mouseX - rect.left) / rect.width) * 100;
	const relativeY = ((mouseY - rect.top) / rect.height) * 100;

	card.style.setProperty("--glow-x", `${relativeX}%`);
	card.style.setProperty("--glow-y", `${relativeY}%`);
	card.style.setProperty("--glow-intensity", glow.toString());
	card.style.setProperty("--glow-radius", `${radius}px`);
};

export const GlobalSpotlight = ({
	gridRef,
	sectionSelector,
	cardSelector = ".project-card",
	disableAnimations = false,
	enabled = true,
	spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
	glowColor = DEFAULT_GLOW_COLOR,
}: {
	gridRef: React.RefObject<HTMLDivElement | null>;
	sectionSelector: string;
	cardSelector?: string;
	disableAnimations?: boolean;
	enabled?: boolean;
	spotlightRadius?: number;
	glowColor?: string;
}) => {
	const spotlightRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (disableAnimations || !gridRef?.current || !enabled) return;

		const spotlight = document.createElement("div");
		spotlight.className = "global-spotlight";
		spotlight.style.cssText = `
			position: fixed;
			width: 800px;
			height: 800px;
			border-radius: 50%;
			pointer-events: none;
			background: radial-gradient(circle,
				rgba(${glowColor}, 0.15) 0%,
				rgba(${glowColor}, 0.08) 15%,
				rgba(${glowColor}, 0.04) 25%,
				rgba(${glowColor}, 0.02) 40%,
				rgba(${glowColor}, 0.01) 65%,
				transparent 70%
			);
			z-index: 5;
			opacity: 0;
			transform: translate(-50%, -50%);
			mix-blend-mode: screen;
		`;
		document.body.appendChild(spotlight);
		spotlightRef.current = spotlight;

		const handleMouseMove = (e: MouseEvent) => {
			if (!spotlightRef.current || !gridRef.current) return;

			const section = gridRef.current.closest(sectionSelector);
			const rect = section?.getBoundingClientRect();
			const mouseInside =
				rect &&
				e.clientX >= rect.left &&
				e.clientX <= rect.right &&
				e.clientY >= rect.top &&
				e.clientY <= rect.bottom;

			const cards = gridRef.current.querySelectorAll<HTMLElement>(cardSelector);

			if (!mouseInside) {
				gsap.to(spotlightRef.current, {
					opacity: 0,
					duration: 0.3,
					ease: "power2.out",
				});
				cards.forEach((card) =>
					card.style.setProperty("--glow-intensity", "0"),
				);
				return;
			}

			const { proximity, fadeDistance } =
				calculateSpotlightValues(spotlightRadius);
			let minDistance = Infinity;

			cards.forEach((card) => {
				const cardRect = card.getBoundingClientRect();
				const centerX = cardRect.left + cardRect.width / 2;
				const centerY = cardRect.top + cardRect.height / 2;
				const distance =
					Math.hypot(e.clientX - centerX, e.clientY - centerY) -
					Math.max(cardRect.width, cardRect.height) / 2;
				const effectiveDistance = Math.max(0, distance);
				minDistance = Math.min(minDistance, effectiveDistance);

				let glowIntensity = 0;
				if (effectiveDistance <= proximity) glowIntensity = 1;
				else if (effectiveDistance <= fadeDistance)
					glowIntensity =
						(fadeDistance - effectiveDistance) / (fadeDistance - proximity);

				updateCardGlowProperties(
					card,
					e.clientX,
					e.clientY,
					glowIntensity,
					spotlightRadius,
				);
			});

			gsap.to(spotlightRef.current, {
				left: e.clientX,
				top: e.clientY,
				duration: 0.1,
				ease: "power2.out",
			});

			const targetOpacity =
				minDistance <= proximity
					? 0.8
					: minDistance <= fadeDistance
						? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.8
						: 0;

			gsap.to(spotlightRef.current, {
				opacity: targetOpacity,
				duration: targetOpacity > 0 ? 0.2 : 0.5,
				ease: "power2.out",
			});
		};

		const handleMouseLeave = () => {
			gridRef.current
				?.querySelectorAll<HTMLElement>(cardSelector)
				.forEach((card) => card.style.setProperty("--glow-intensity", "0"));
			if (spotlightRef.current)
				gsap.to(spotlightRef.current, {
					opacity: 0,
					duration: 0.3,
					ease: "power2.out",
				});
		};

		document.addEventListener("mousemove", handleMouseMove);
		document.addEventListener("mouseleave", handleMouseLeave);

		return () => {
			document.removeEventListener("mousemove", handleMouseMove);
			document.removeEventListener("mouseleave", handleMouseLeave);
			spotlightRef.current?.parentNode?.removeChild(spotlightRef.current);
		};
	}, [
		gridRef,
		sectionSelector,
		cardSelector,
		disableAnimations,
		enabled,
		spotlightRadius,
		glowColor,
	]);

	return null;
};

export const useMobileDetection = (breakpoint = MOBILE_BREAKPOINT) => {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkMobile = () => setIsMobile(window.innerWidth <= breakpoint);
		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, [breakpoint]);

	return isMobile;
};
