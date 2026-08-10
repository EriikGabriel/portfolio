"use client";

import { SiGithub } from "@icons-pack/react-simple-icons";
import { Badge } from "@ui/badge";
import BorderGlow from "@ui/border-glow";
import GlassSurface from "@ui/glass-surface";
import { cn } from "@utils/cn";
import { ExternalLinkIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Motion } from "../../Motion";

export interface ProjectCardProps {
	title: string;
	description: string;
	href: string;
	github?: string;
	cover?: string;
	tags?: string[];
	featured?: boolean;
	index?: number;
}

export function ProjectCard({
	title,
	description,
	href,
	github,
	cover = "/cover.png",
	tags = [],
	featured = false,
	index = 0,
}: ProjectCardProps) {
	const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
	const [isHovered, setIsHovered] = useState(false);

	return (
		<Motion
			initial={{ opacity: 0, y: 24 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ delay: index * 0.1 + 0.2, duration: 0.5, ease: "easeOut" }}
			className={cn(featured && "md:col-span-2")}
		>
			<BorderGlow
				borderRadius={16}
				glowColor="35 70 60"
				glowRadius={50}
				glowIntensity={0.9}
				coneSpread={30}
				edgeSensitivity={25}
				colors={["#eec29f", "#ee6f35", "#d97706"]}
				className="h-full w-full"
			>
				{/* biome-ignore lint/a11y/noStaticElementInteractions: interactive spotlight effect on card */}
				<div
					className={cn(
						"relative overflow-hidden rounded-2xl group cursor-pointer w-full",
						featured ? "h-72" : "h-60",
					)}
					onMouseMove={(e) => {
						const rect = e.currentTarget.getBoundingClientRect();
						setMousePos({
							x: e.clientX - rect.left,
							y: e.clientY - rect.top,
						});
					}}
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}
				>
					<Image
						src={cover}
						alt={`Preview de ${title}`}
						fill
						sizes="(max-width: 768px) 100vw, 50vw"
						className="object-cover opacity-30 scale-[1.06] transition-all duration-700 ease-out group-hover:scale-100 group-hover:opacity-50"
					/>

					<div className="absolute inset-0 bg-linear-to-t from-neutral-950 via-neutral-950/55 to-neutral-950/10 transition-opacity duration-500 group-hover:opacity-80" />

					<div
						className="absolute inset-0 rounded-[inherit] pointer-events-none transition-opacity duration-300"
						style={{
							opacity: isHovered ? 1 : 0,
							background: `radial-gradient(280px circle at ${mousePos.x}px ${mousePos.y}px, rgba(238,194,159,0.10), transparent 70%)`,
						}}
					/>

					<div className="absolute bottom-0 left-0 right-0">
						<GlassSurface
							width="100%"
							height="auto"
							backgroundOpacity={0.05}
							borderRadius={0}
						>
							<div className="w-full flex flex-col gap-2 items-start px-2 py-1">
								<div>
									<h3 className="font-semibold text-white text-sm leading-snug">
										{title}
									</h3>
									<p className="text-xs text-neutral-400 mt-0.5 line-clamp-2 leading-relaxed">
										{description}
									</p>
								</div>

								{tags.length > 0 && (
									<div className="flex flex-wrap gap-1">
										{tags.map((tag) => (
											<Badge
												variant="rotate-border"
												key={tag}
												className="px-2 py-0.5 text-[10px] rounded-full bg-neutral-800/60 text-neutral-400 border border-white/8"
											>
												{tag}
											</Badge>
										))}
									</div>
								)}

								{/* Links */}
								<div className="flex w-full gap-2">
									<a
										href={href}
										target="_blank"
										rel="noopener noreferrer"
										onClick={(e) => e.stopPropagation()}
										className="flex items-center justify-center gap-2 h-10 min-w-30 w-full px-2.5 py-1 rounded-lg text-sm bg-orange-500/15 text-orange-300 border border-amber-500/25 hover:bg-amber-500/25 transition-colors"
									>
										<ExternalLinkIcon size={16} />
										Demo
									</a>
									{github && (
										<a
											href={github}
											target="_blank"
											rel="noopener noreferrer"
											onClick={(e) => e.stopPropagation()}
											className="flex items-center justify-center gap-2 h-10 min-w-30 w-full px-2.5 py-1 rounded-lg text-sm font-medium bg-white/7 text-neutral-400 border border-white/10 hover:bg-white/12 transition-colors"
										>
											<SiGithub size={16} />
											GitHub
										</a>
									)}
								</div>
							</div>
						</GlassSurface>
					</div>
				</div>
			</BorderGlow>
		</Motion>
	);
}
