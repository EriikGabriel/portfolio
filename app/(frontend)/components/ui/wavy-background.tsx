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
	blur = 0,
	speed = "fast",
	waveOpacity = 1,
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
	const containerRef = useRef<HTMLDivElement | null>(null);
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
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
		const container = containerRef.current;
		if (!canvas || !container) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		const OVERSCAN = 64;
		let w = 0;
		let h = 0;
		let nt = 0;
		const waveColors = colors ?? [
			"oklch(0.8 0.22 70 / 0.85)",
			"oklch(0.72 0.2 62 / 0.75)",
			"oklch(0.64 0.18 55 / 0.68)",
			"oklch(0.56 0.16 48 / 0.62)",
			"oklch(0.48 0.14 42 / 0.58)",
		];
		const resizeCanvas = () => {
			const rect = container.getBoundingClientRect();
			w = rect.width + OVERSCAN;
			h = rect.height + OVERSCAN;
			canvas.width = w;
			canvas.height = 600;
			ctx.filter = `blur(${blur}px)`;
		};
		resizeCanvas();
		const getSpeed = () => {
			return speed === "slow" ? 0.001 : 0.002;
		};
		const drawWave = (n: number) => {
			nt += getSpeed();
			for (let i = 0; i < n; i++) {
				ctx.beginPath();
				ctx.lineWidth = waveWidth ?? 200;
				ctx.strokeStyle = waveColors[i % waveColors.length];
				for (let x = 0; x < w; x += 5) {
					// curva sobe a partir da base, proporcional à altura do container
					const y = -Math.abs(noise(x / 300, 0.3 * i, nt)) * (h * 0.32);
					ctx.lineTo(x, y + h * 0.92 + i * (h * 0.035));
				}
				ctx.stroke();
				ctx.closePath();
			}
		};
		const render = () => {
			ctx.clearRect(0, 0, w, h);
			ctx.globalAlpha = waveOpacity;
			ctx.fillStyle = backgroundFill ?? "transparent";
			ctx.fillRect(0, 0, w, h);
			drawWave(5);
			animationIdRef.current = requestAnimationFrame(render);
		};
		const resizeObserver = new ResizeObserver(resizeCanvas);
		resizeObserver.observe(container);
		render();
		return () => {
			cancelAnimationFrame(animationIdRef.current);
			resizeObserver.disconnect();
		};
	}, [blur, speed, colors, waveWidth, backgroundFill, waveOpacity]);
	return (
		<div
			ref={containerRef}
			className={cn(
				"relative flex h-48 md:h-96 w-full flex-col items-center justify-center overflow-hidden",
				containerClassName,
			)}
		>
			<canvas
				ref={canvasRef}
				id="canvas"
				className={cn(
					"absolute -inset-8 z-0 h-[calc(100%+4rem)] w-[calc(100%+4rem)] mix-blend-screen",
					"blur-md",
					"shadow-amber-600 shadow-2xl drop-shadow-2xl",
					"mask-[linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.15)_30%,rgba(0,0,0,0.6)_52%,black_72%,black_100%)]",
					"[-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.15)_30%,rgba(0,0,0,0.6)_52%,black_72%,black_100%)]",
				)}
				style={
					isSafari
						? {
								filter: `blur(${Math.max(blur, 16)}px)`,
							}
						: undefined
				}
			/>
			<div className={cn("relative ", className)} {...props}>
				{children}
			</div>
		</div>
	);
};
