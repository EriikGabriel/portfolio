"use client";

import type { Container } from "@tsparticles/engine";
import Particles, { ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { cn } from "@utils/cn";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

type ParticlesProps = {
	id?: string;
	className?: string;
	background?: string;
	particleSize?: number;
	minSize?: number;
	maxSize?: number;
	speed?: number;
	particleColor?: string;
	particleDensity?: number;
};

export const Sparkles = ({
	id,
	className,
	background = "transparent",
	minSize = 1,
	maxSize = 3,
	speed = 1,
	particleColor = "#ffffff",
	particleDensity = 120,
}: ParticlesProps) => {
	const [init, setInit] = useState(false);
	const controls = useAnimation();

	useEffect(() => {
		setInit(true);
	}, []);

	const particlesLoaded = async (container?: Container) => {
		if (!container) return;

		controls.start({
			opacity: 1,
			transition: {
				duration: 1,
			},
		});
	};

	return (
		<motion.div animate={controls} className={cn("opacity-0", className)}>
			{init && (
				<ParticlesProvider init={loadSlim}>
					<Particles
					id={id ?? "tsparticles"}
					className="h-full w-full"
					particlesLoaded={particlesLoaded}
					options={{
						background: {
							color: {
								value: background,
							},
						},

						fullScreen: {
							enable: false,
							zIndex: 1,
						},

						fpsLimit: 120,
						detectRetina: true,

						interactivity: {
							events: {
								onClick: {
									enable: true,
									mode: "push",
								},

								onHover: {
									enable: false,
									mode: "repulse",
								},
							},

							modes: {
								push: {
									quantity: 4,
								},

								repulse: {
									distance: 200,
									duration: 0.4,
								},
							},
						},

						particles: {
							number: {
								value: particleDensity,

								density: {
									enable: true,
									width: 400,
									height: 400,
								},
							},

							color: {
								value: particleColor,
							},

							shape: {
								type: "circle",
							},

							opacity: {
								value: {
									min: 0.1,
									max: 1,
								},

								animation: {
									enable: true,
									speed,
									sync: false,
								},
							},

							size: {
								value: {
									min: minSize,
									max: maxSize,
								},
							},

							move: {
								enable: true,

								direction: "none",

								speed: {
									min: 0.1,
									max: speed,
								},

								random: false,

								straight: false,

								outModes: {
									default: "out",
								},
							},

							links: {
								enable: false,
							},

							shadow: {
								enable: false,
							},
						},
					}}
					/>
				</ParticlesProvider>
			)}
		</motion.div>
	);
};
