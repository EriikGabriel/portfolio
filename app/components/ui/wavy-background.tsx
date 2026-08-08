"use client";

import { cn } from "@utils/cn";
import { useEffect, useRef, useState } from "react";
import { createNoise3D } from "simplex-noise";

export const WavyBackground = ({
	children,
	className,
	containerClassName,
	colors,
	waveWidth,
	backgroundFill,
	blur = 10,
	speed = "fast",
	waveOpacity = 0.5,
	...props
}: {
	children?: React.ReactNode;
	className?: string;
	containerClassName?: string;
	colors?: string[];
	waveWidth?: number;
	backgroundFill?: string;
	blur?: number;
	speed?: "slow" | "fast";
	waveOpacity?: number;
	[key: string]: unknown;
}) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const animationIdRef = useRef<number>(0);

	const [isSafari, setIsSafari] = useState(false);

	useEffect(() => {
		setIsSafari(
			typeof window !== "undefined" &&
				navigator.userAgent.includes("Safari") &&
				!navigator.userAgent.includes("Chrome"),
		);
	}, []);

	useEffect(() => {
		const noise = createNoise3D();
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		ctx.canvas.width = window.innerWidth;
		ctx.canvas.height = window.innerHeight;
		let w = window.innerWidth;
		let h = window.innerHeight;
		let nt = 0;

		ctx.filter = `blur(${blur}px)`;

		const getSpeed = () => (speed === "slow" ? 0.001 : 0.002);

		const waveColors = colors ?? [
			"oklch(0.8 0.22 70 / 0.85)",
			"oklch(0.72 0.2 62 / 0.75)",
			"oklch(0.64 0.18 55 / 0.68)",
			"oklch(0.56 0.16 48 / 0.62)",
			"oklch(0.48 0.14 42 / 0.58)",
		];

		const drawWave = (n: number) => {
			nt += getSpeed();
			for (let i = 0; i < n; i++) {
				ctx.beginPath();
				ctx.lineWidth = waveWidth ?? 50;
				ctx.strokeStyle = waveColors[i % waveColors.length];
				for (let x = 0; x < w; x += 5) {
					const y = noise(x / 800, 0.3 * i, nt) * 100;
					ctx.lineTo(x, y + h * 0.65);
				}
				ctx.stroke();
				ctx.closePath();
			}
		};

		const render = () => {
			ctx.fillStyle = backgroundFill ?? "transparent";
			ctx.globalAlpha = waveOpacity;
			ctx.fillRect(0, 0, w, h);
			drawWave(5);
			animationIdRef.current = requestAnimationFrame(render);
		};

		const onResize = () => {
			w = window.innerWidth;
			h = window.innerHeight;
			ctx.canvas.width = w;
			ctx.canvas.height = h;
			ctx.filter = `blur(${blur}px)`;
		};

		window.addEventListener("resize", onResize);
		render();

		return () => {
			cancelAnimationFrame(animationIdRef.current);
			window.removeEventListener("resize", onResize);
		};
	}, [blur, speed, colors, waveWidth, backgroundFill, waveOpacity]);

	return (
		<div
			className={cn(
				"relative flex h-screen flex-col items-center justify-center overflow-hidden",
				containerClassName,
			)}
		>
			<canvas
				className="absolute inset-0 z-0"
				ref={canvasRef}
				id="canvas"
				style={isSafari ? { filter: `blur(${blur}px)` } : undefined}
			/>
			<div className={cn("relative z-10", className)} {...props}>
				{children}
			</div>
		</div>
	);
};
