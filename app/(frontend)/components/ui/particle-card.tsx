"use client";

import { cn } from "@utils/cn";
import { gsap } from "gsap";
import { useCallback, useEffect, useRef } from "react";

const DEFAULT_PARTICLE_COUNT = 10;
const DEFAULT_GLOW_COLOR = "238, 194, 159"; // paleta amber/laranja do site

const createParticleElement = (
	x: number,
	y: number,
	color: string,
): HTMLDivElement => {
	const el = document.createElement("div");
	el.className = "particle";
	el.style.cssText = `
		position: absolute;
		width: 4px;
		height: 4px;
		border-radius: 50%;
		background: rgba(${color}, 1);
		box-shadow: 0 0 6px rgba(${color}, 0.6);
		pointer-events: none;
		z-index: 20;
		left: ${x}px;
		top: ${y}px;
	`;
	return el;
};

export interface ParticleCardProps {
	children: React.ReactNode;
	className?: string;
	style?: React.CSSProperties;
	disableAnimations?: boolean;
	particleCount?: number;
	glowColor?: string;
	enableTilt?: boolean;
	clickEffect?: boolean;
	enableMagnetism?: boolean;
}

export const ParticleCard = ({
	children,
	className,
	style,
	disableAnimations = false,
	particleCount = DEFAULT_PARTICLE_COUNT,
	glowColor = DEFAULT_GLOW_COLOR,
	enableTilt = true,
	clickEffect = true,
	enableMagnetism = true,
}: ParticleCardProps) => {
	const cardRef = useRef<HTMLDivElement>(null);
	const particlesRef = useRef<HTMLDivElement[]>([]);
	const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
	const isHoveredRef = useRef(false);
	const memoizedParticles = useRef<HTMLDivElement[]>([]);
	const particlesInitialized = useRef(false);
	const magnetismAnimationRef = useRef<gsap.core.Tween | null>(null);

	const initializeParticles = useCallback(() => {
		if (particlesInitialized.current || !cardRef.current) return;
		const { width, height } = cardRef.current.getBoundingClientRect();
		memoizedParticles.current = Array.from({ length: particleCount }, () =>
			createParticleElement(
				Math.random() * width,
				Math.random() * height,
				glowColor,
			),
		);
		particlesInitialized.current = true;
	}, [particleCount, glowColor]);

	const clearAllParticles = useCallback(() => {
		timeoutsRef.current.forEach(clearTimeout);
		timeoutsRef.current = [];
		magnetismAnimationRef.current?.kill();

		particlesRef.current.forEach((particle) => {
			gsap.to(particle, {
				scale: 0,
				opacity: 0,
				duration: 0.3,
				ease: "back.in(1.7)",
				onComplete: () => particle.parentNode?.removeChild(particle),
			});
		});
		particlesRef.current = [];
	}, []);

	const animateParticles = useCallback(() => {
		if (!cardRef.current || !isHoveredRef.current) return;
		if (!particlesInitialized.current) initializeParticles();

		memoizedParticles.current.forEach((particle, index) => {
			const timeoutId = setTimeout(() => {
				if (!isHoveredRef.current || !cardRef.current) return;

				const clone = particle.cloneNode(true) as HTMLDivElement;
				cardRef.current.appendChild(clone);
				particlesRef.current.push(clone);

				gsap.fromTo(
					clone,
					{ scale: 0, opacity: 0 },
					{ scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" },
				);
				gsap.to(clone, {
					x: (Math.random() - 0.5) * 90,
					y: (Math.random() - 0.5) * 90,
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
	}, [initializeParticles]);

	useEffect(() => {
		if (disableAnimations || !cardRef.current) return;
		const element = cardRef.current;

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
				gsap.to(element, { x: 0, y: 0, duration: 0.3, ease: "power2.out" });
			}
		};

		const handleMouseMove = (e: MouseEvent) => {
			if (!enableTilt && !enableMagnetism) return;
			const rect = element.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;
			const centerX = rect.width / 2;
			const centerY = rect.height / 2;

			if (enableTilt) {
				const rotateX = ((y - centerY) / centerY) * -8;
				const rotateY = ((x - centerX) / centerX) * 8;
				gsap.to(element, {
					rotateX,
					rotateY,
					duration: 0.1,
					ease: "power2.out",
					transformPerspective: 1000,
				});
			}
			if (enableMagnetism) {
				const magnetX = (x - centerX) * 0.04;
				const magnetY = (y - centerY) * 0.04;
				magnetismAnimationRef.current = gsap.to(element, {
					x: magnetX,
					y: magnetY,
					duration: 0.3,
					ease: "power2.out",
				});
			}
		};

		const handleClick = (e: MouseEvent) => {
			if (!clickEffect) return;
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
				background: radial-gradient(circle, rgba(${glowColor}, 0.35) 0%, rgba(${glowColor}, 0.15) 30%, transparent 70%);
				left: ${x - maxDistance}px;
				top: ${y - maxDistance}px;
				pointer-events: none;
				z-index: 30;
			`;
			element.appendChild(ripple);

			gsap.fromTo(
				ripple,
				{ scale: 0, opacity: 1 },
				{
					scale: 1,
					opacity: 0,
					duration: 0.8,
					ease: "power2.out",
					onComplete: () => ripple.remove(),
				},
			);
		};

		element.addEventListener("mouseenter", handleMouseEnter);
		element.addEventListener("mouseleave", handleMouseLeave);
		element.addEventListener("mousemove", handleMouseMove);
		element.addEventListener("click", handleClick);

		return () => {
			isHoveredRef.current = false;
			element.removeEventListener("mouseenter", handleMouseEnter);
			element.removeEventListener("mouseleave", handleMouseLeave);
			element.removeEventListener("mousemove", handleMouseMove);
			element.removeEventListener("click", handleClick);
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
			className={cn("relative overflow-hidden", className)}
			style={style}
		>
			{children}
		</div>
	);
};
