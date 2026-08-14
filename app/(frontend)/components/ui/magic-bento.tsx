"use client";

import type { Project } from "@payload/payload-types";
import { ProjectCard } from "@sections/projects/project-card";
import type { Populated } from "@utils/payload";
import { gsap } from "gsap";
import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";

export interface BentoProps {
	projects: Populated<Project>[];
	textAutoHide?: boolean;
	enableStars?: boolean;
	enableSpotlight?: boolean;
	enableBorderGlow?: boolean;
	disableAnimations?: boolean;
	spotlightRadius?: number;
	particleCount?: number;
	enableTilt?: boolean;
	glowColor?: string;
	clickEffect?: boolean;
	enableMagnetism?: boolean;
}

// ============================================================
// Defaults
// ============================================================

const DEFAULT_PARTICLE_COUNT = 10;
const DEFAULT_PARTICLE_SIZE = 3;
const DEFAULT_PARTICLE_GLOW = 6;

const DEFAULT_SPOTLIGHT_RADIUS = 300;
const DEFAULT_GLOW_COLOR = "255, 170, 80";

const DEFAULT_TILT_STRENGTH = 10;
const DEFAULT_MAGNETISM_STRENGTH = 0.05;

const MOBILE_BREAKPOINT = 768;

// ============================================================
// Helpers
// ============================================================

const createParticleElement = (
	x: number,
	y: number,
	color: string = DEFAULT_GLOW_COLOR,
): HTMLDivElement => {
	const el = document.createElement("div");

	el.className = "particle";

	el.style.cssText = `
		position: absolute;
		width: ${DEFAULT_PARTICLE_SIZE}px;
		height: ${DEFAULT_PARTICLE_SIZE}px;
		border-radius: 50%;
		background: rgb(${color});
		box-shadow: 0 0 ${DEFAULT_PARTICLE_GLOW}px rgba(${color}, 0.6);
		pointer-events: none;
		z-index: 100;
		left: ${x}px;
		top: ${y}px;
	`;

	return el;
};

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

// ============================================================
// Project Content
// ============================================================

// ============================================================
// Particle Card
// ============================================================

const ParticleCard: React.FC<{
	children: React.ReactNode;
	className?: string;
	disableAnimations?: boolean;
	style?: React.CSSProperties;

	enableParticles?: boolean;
	particleCount?: number;
	glowColor?: string;

	enableTilt?: boolean;
	clickEffect?: boolean;
	enableMagnetism?: boolean;
}> = ({
	children,
	className = "",
	disableAnimations = false,
	style,

	enableParticles = true,
	particleCount = DEFAULT_PARTICLE_COUNT,
	glowColor = DEFAULT_GLOW_COLOR,

	enableTilt = false,
	clickEffect = false,
	enableMagnetism = false,
}) => {
	const cardRef = useRef<HTMLDivElement>(null);

	const particlesRef = useRef<HTMLDivElement[]>([]);
	const memoizedParticles = useRef<HTMLDivElement[]>([]);
	const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

	const particlesInitialized = useRef(false);
	const isHoveredRef = useRef(false);

	const initializeParticles = useCallback(() => {
		if (particlesInitialized.current || !cardRef.current || !enableParticles) {
			return;
		}

		const { width, height } = cardRef.current.getBoundingClientRect();

		memoizedParticles.current = Array.from({ length: particleCount }, () =>
			createParticleElement(
				Math.random() * width,
				Math.random() * height,
				glowColor,
			),
		);

		particlesInitialized.current = true;
	}, [particleCount, glowColor, enableParticles]);

	const clearAllParticles = useCallback(() => {
		timeoutsRef.current.forEach(clearTimeout);
		timeoutsRef.current = [];

		particlesRef.current.forEach((particle) => {
			gsap.killTweensOf(particle);

			gsap.to(particle, {
				scale: 0,
				opacity: 0,
				duration: 0.25,
				ease: "back.in(1.7)",
				onComplete: () => {
					particle.remove();
				},
			});
		});

		particlesRef.current = [];
	}, []);

	const animateParticles = useCallback(() => {
		if (!enableParticles || !cardRef.current || !isHoveredRef.current) {
			return;
		}

		if (!particlesInitialized.current) {
			initializeParticles();
		}

		memoizedParticles.current.forEach((particle, index) => {
			const timeoutId = setTimeout(() => {
				if (!isHoveredRef.current || !cardRef.current) {
					return;
				}

				const clone = particle.cloneNode(true) as HTMLDivElement;

				cardRef.current.appendChild(clone);
				particlesRef.current.push(clone);

				gsap.fromTo(
					clone,
					{
						scale: 0,
						opacity: 0,
					},
					{
						scale: 1,
						opacity: 1,
						duration: 0.3,
						ease: "back.out(1.7)",
					},
				);

				gsap.to(clone, {
					x: (Math.random() - 0.5) * 100,
					y: (Math.random() - 0.5) * 100,
					rotation: Math.random() * 360,
					duration: 2 + Math.random() * 2,
					ease: "none",
					repeat: -1,
					yoyo: true,
				});

				gsap.to(clone, {
					opacity: 0.3,
					duration: 1.5,
					ease: "power2.inOut",
					repeat: -1,
					yoyo: true,
				});
			}, index * 100);

			timeoutsRef.current.push(timeoutId);
		});
	}, [enableParticles, initializeParticles]);

	useEffect(() => {
		if (disableAnimations || !cardRef.current) {
			return;
		}

		const element = cardRef.current;

		// --------------------------------------------------------
		// GSAP quickTo
		// --------------------------------------------------------

		const rotateXTo = gsap.quickTo(element, "rotateX", {
			duration: 0.15,
			ease: "power2.out",
		});

		const rotateYTo = gsap.quickTo(element, "rotateY", {
			duration: 0.15,
			ease: "power2.out",
		});

		const xTo = gsap.quickTo(element, "x", {
			duration: 0.3,
			ease: "power2.out",
		});

		const yTo = gsap.quickTo(element, "y", {
			duration: 0.3,
			ease: "power2.out",
		});

		// --------------------------------------------------------
		// Mouse Enter
		// --------------------------------------------------------

		const handleMouseEnter = () => {
			isHoveredRef.current = true;

			animateParticles();

			if (enableTilt) {
				gsap.to(element, {
					rotateX: 5,
					rotateY: 5,
					duration: 0.3,
					ease: "power2.out",
					transformPerspective: 1000,
				});
			}
		};

		// --------------------------------------------------------
		// Mouse Leave
		// --------------------------------------------------------

		const handleMouseLeave = () => {
			isHoveredRef.current = false;

			clearAllParticles();

			if (enableTilt) {
				gsap.to(element, {
					rotateX: 0,
					rotateY: 0,
					duration: 0.3,
					ease: "power2.out",
				});
			}

			if (enableMagnetism) {
				xTo(0);
				yTo(0);
			}
		};

		// --------------------------------------------------------
		// Mouse Move
		// --------------------------------------------------------

		const handleMouseMove = (e: MouseEvent) => {
			if (!enableTilt && !enableMagnetism) {
				return;
			}

			const rect = element.getBoundingClientRect();

			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;

			const centerX = rect.width / 2;
			const centerY = rect.height / 2;

			if (enableTilt) {
				const rotateX = ((y - centerY) / centerY) * -DEFAULT_TILT_STRENGTH;

				const rotateY = ((x - centerX) / centerX) * DEFAULT_TILT_STRENGTH;

				rotateXTo(rotateX);
				rotateYTo(rotateY);
			}

			if (enableMagnetism) {
				const magnetX = (x - centerX) * DEFAULT_MAGNETISM_STRENGTH;

				const magnetY = (y - centerY) * DEFAULT_MAGNETISM_STRENGTH;

				xTo(magnetX);
				yTo(magnetY);
			}
		};

		// --------------------------------------------------------
		// Click Ripple
		// --------------------------------------------------------

		const handleClick = (e: MouseEvent) => {
			if (!clickEffect) {
				return;
			}

			const rect = element.getBoundingClientRect();

			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;

			const maxDistance = Math.max(
				Math.hypot(x, y),
				Math.hypot(x - rect.width, y),
				Math.hypot(x, y - rect.height),
				Math.hypot(x - rect.width, y - rect.height),
			);

			const ripple = document.createElement("div");

			ripple.style.cssText = `
				position: absolute;
				width: ${maxDistance * 2}px;
				height: ${maxDistance * 2}px;
				border-radius: 50%;
				background:
					radial-gradient(
						circle,
						rgba(${glowColor}, 0.4) 0%,
						rgba(${glowColor}, 0.2) 30%,
						transparent 70%
					);
				left: ${x - maxDistance}px;
				top: ${y - maxDistance}px;
				pointer-events: none;
				z-index: 1000;
			`;

			element.appendChild(ripple);

			gsap.fromTo(
				ripple,
				{
					scale: 0,
					opacity: 1,
				},
				{
					scale: 1,
					opacity: 0,
					duration: 0.8,
					ease: "power2.out",
					onComplete: () => ripple.remove(),
				},
			);
		};

		// --------------------------------------------------------
		// Listeners
		// --------------------------------------------------------

		element.addEventListener("mouseenter", handleMouseEnter);
		element.addEventListener("mouseleave", handleMouseLeave);
		element.addEventListener("mousemove", handleMouseMove);
		element.addEventListener("click", handleClick);

		// --------------------------------------------------------
		// Cleanup
		// --------------------------------------------------------

		return () => {
			isHoveredRef.current = false;

			element.removeEventListener("mouseenter", handleMouseEnter);

			element.removeEventListener("mouseleave", handleMouseLeave);

			element.removeEventListener("mousemove", handleMouseMove);

			element.removeEventListener("click", handleClick);

			gsap.killTweensOf(element);

			clearAllParticles();
		};
	}, [
		animateParticles,
		clearAllParticles,
		disableAnimations,
		enableTilt,
		enableMagnetism,
		clickEffect,
		glowColor,
	]);

	return (
		<div
			ref={cardRef}
			className={`${className} relative overflow-hidden`}
			style={{
				...style,
				position: "relative",
				overflow: "hidden",
			}}
		>
			{children}
		</div>
	);
};

// ============================================================
// Global Spotlight
// ============================================================

const GlobalSpotlight: React.FC<{
	gridRef: React.RefObject<HTMLDivElement | null>;
	disableAnimations?: boolean;
	enabled?: boolean;
	spotlightRadius?: number;
	glowColor?: string;
}> = ({
	gridRef,
	disableAnimations = false,
	enabled = true,
	spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
	glowColor = DEFAULT_GLOW_COLOR,
}) => {
	const spotlightRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (disableAnimations || !gridRef.current || !enabled) {
			return;
		}

		const grid = gridRef.current;

		const spotlight = document.createElement("div");

		spotlight.className = "global-spotlight";

		spotlight.style.cssText = `
			position: fixed;
			width: 800px;
			height: 800px;
			border-radius: 50%;
			pointer-events: none;

			background: radial-gradient(
				circle,
				rgba(${glowColor}, 0.15) 0%,
				rgba(${glowColor}, 0.08) 15%,
				rgba(${glowColor}, 0.04) 25%,
				rgba(${glowColor}, 0.02) 40%,
				rgba(${glowColor}, 0.01) 65%,
				transparent 70%
			);

			z-index: 200;
			opacity: 0;
			transform: translate(-50%, -50%);
			mix-blend-mode: screen;
			will-change: transform, opacity;
		`;

		document.body.appendChild(spotlight);
		spotlightRef.current = spotlight;

		// --------------------------------------------------------
		// GSAP quickTo
		// --------------------------------------------------------

		const leftTo = gsap.quickTo(spotlight, "left", {
			duration: 0.12,
			ease: "power2.out",
		});

		const topTo = gsap.quickTo(spotlight, "top", {
			duration: 0.12,
			ease: "power2.out",
		});

		const opacityTo = gsap.quickTo(spotlight, "opacity", {
			duration: 0.2,
			ease: "power2.out",
		});

		// --------------------------------------------------------
		// Mouse Move
		// --------------------------------------------------------

		const handleMouseMove = (e: MouseEvent) => {
			if (!spotlightRef.current) {
				return;
			}

			const section = grid.closest(".bento-section");

			const sectionRect = section?.getBoundingClientRect();

			if (!sectionRect) {
				return;
			}

			const mouseInside =
				e.clientX >= sectionRect.left &&
				e.clientX <= sectionRect.right &&
				e.clientY >= sectionRect.top &&
				e.clientY <= sectionRect.bottom;

			const cards = grid.querySelectorAll<HTMLElement>(".card");

			if (!mouseInside) {
				opacityTo(0);

				cards.forEach((card) => {
					card.style.setProperty("--glow-intensity", "0");
				});

				return;
			}

			const { proximity, fadeDistance } =
				calculateSpotlightValues(spotlightRadius);

			let minDistance = Infinity;

			cards.forEach((card) => {
				const rect = card.getBoundingClientRect();

				const centerX = rect.left + rect.width / 2;

				const centerY = rect.top + rect.height / 2;

				const distance =
					Math.hypot(e.clientX - centerX, e.clientY - centerY) -
					Math.max(rect.width, rect.height) / 2;

				const effectiveDistance = Math.max(0, distance);

				minDistance = Math.min(minDistance, effectiveDistance);

				let glowIntensity = 0;

				if (effectiveDistance <= proximity) {
					glowIntensity = 1;
				} else if (effectiveDistance <= fadeDistance) {
					glowIntensity =
						(fadeDistance - effectiveDistance) / (fadeDistance - proximity);
				}

				updateCardGlowProperties(
					card,
					e.clientX,
					e.clientY,
					glowIntensity,
					spotlightRadius,
				);
			});

			leftTo(e.clientX);
			topTo(e.clientY);

			let targetOpacity = 0;

			if (minDistance <= proximity) {
				targetOpacity = 0.8;
			} else if (minDistance <= fadeDistance) {
				targetOpacity =
					((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.8;
			}

			opacityTo(targetOpacity);
		};

		// --------------------------------------------------------
		// Mouse Leave
		// --------------------------------------------------------

		const handleMouseLeave = () => {
			opacityTo(0);

			grid.querySelectorAll<HTMLElement>(".card").forEach((card) => {
				card.style.setProperty("--glow-intensity", "0");
			});
		};

		document.addEventListener("mousemove", handleMouseMove);

		document.addEventListener("mouseleave", handleMouseLeave);

		// --------------------------------------------------------
		// Cleanup
		// --------------------------------------------------------

		return () => {
			document.removeEventListener("mousemove", handleMouseMove);

			document.removeEventListener("mouseleave", handleMouseLeave);

			gsap.killTweensOf(spotlight);

			spotlight.remove();
			spotlightRef.current = null;
		};
	}, [gridRef, disableAnimations, enabled, spotlightRadius, glowColor]);

	return null;
};

// ============================================================
// Bento Grid
// ============================================================

const BentoCardGrid: React.FC<{
	children: React.ReactNode;
	gridRef?: React.RefObject<HTMLDivElement | null>;
}> = ({ children, gridRef }) => (
	<div
		ref={gridRef}
		className="bento-section relative mx-auto grid max-w-6xl select-none gap-4 p-3"
	>
		{children}
	</div>
);

// ============================================================
// Mobile Detection
// ============================================================

const useMobileDetection = () => {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
		};

		checkMobile();

		window.addEventListener("resize", checkMobile);

		return () => {
			window.removeEventListener("resize", checkMobile);
		};
	}, []);

	return isMobile;
};

// ============================================================
// Magic Bento
// ============================================================

const MagicBento: React.FC<BentoProps> = ({
	projects,

	textAutoHide = true,

	enableStars = true,
	enableSpotlight = true,
	enableBorderGlow = true,

	disableAnimations = false,

	spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
	particleCount = DEFAULT_PARTICLE_COUNT,

	enableTilt = false,

	glowColor = DEFAULT_GLOW_COLOR,

	clickEffect = true,
	enableMagnetism = true,
}) => {
	const gridRef = useRef<HTMLDivElement>(null);

	const isMobile = useMobileDetection();

	const shouldDisableAnimations = disableAnimations || isMobile;

	// ----------------------------------------------------------
	// Card Classes
	// ----------------------------------------------------------

	const baseClassName = (project: Populated<Project>) =>
		`
		card
		relative
		w-full
		max-w-full
		min-h-[220px]
		overflow-hidden
		rounded-2xl
		border
		border-white/8
		bg-neutral-950
		transition-colors
		duration-300
		ease-in-out
		hover:-translate-y-0.5
		${enableBorderGlow ? "card--border-glow" : ""}
		${project.featured ? "card--featured aspect-[16/5]" : "aspect-[16/4]"}
	`;

	// ----------------------------------------------------------
	// CSS Variables
	// ----------------------------------------------------------

	const cardStyle = {
		"--glow-x": "50%",
		"--glow-y": "50%",
		"--glow-intensity": "0",
		"--glow-radius": `${spotlightRadius}px`,
		"--glow-color": glowColor,
	} as React.CSSProperties;

	return (
		<>
			{/* =====================================================
			    Global Spotlight
			===================================================== */}

			{enableSpotlight && (
				<GlobalSpotlight
					gridRef={gridRef}
					disableAnimations={shouldDisableAnimations}
					enabled={enableSpotlight}
					spotlightRadius={spotlightRadius}
					glowColor={glowColor}
				/>
			)}

			{/* =====================================================
			    Grid
			===================================================== */}

			<BentoCardGrid gridRef={gridRef}>
				<div className="card-responsive grid gap-4">
					{projects.map((project) => (
						<ParticleCard
							key={project.title}
							className={baseClassName(project)}
							style={cardStyle}
							disableAnimations={shouldDisableAnimations}
							enableParticles={enableStars}
							particleCount={particleCount}
							glowColor={glowColor}
							enableTilt={enableTilt}
							clickEffect={clickEffect}
							enableMagnetism={enableMagnetism}
						>
							<ProjectCard project={project} textAutoHide={textAutoHide} />
						</ParticleCard>
					))}
				</div>
			</BentoCardGrid>
		</>
	);
};

export default MagicBento;
