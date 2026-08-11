"use client";

import { SiGithub } from "@icons-pack/react-simple-icons";
import { Badge } from "@ui/badge";

import GlassSurface from "@ui/glass-surface";

import { ExternalLinkIcon } from "lucide-react";
import Image from "next/image";

export interface MagicBentoProject {
	title: string;
	description: string;
	href: string;
	github?: string;
	cover?: string;
	tags?: string[];
	featured?: boolean;
}

interface ProjectCardProps {
	project: MagicBentoProject;
	textAutoHide?: boolean;
}

export function ProjectCard({ project, textAutoHide }: ProjectCardProps) {
	return (
		<div className="group relative h-full w-full">
			<Image
				src={project.cover ?? "/assets/cover.png"}
				alt={`Preview de ${project.title}`}
				fill
				sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
				className="scale-[1.06] object-cover opacity-30 transition-all duration-700 ease-out group-hover:scale-100 group-hover:opacity-50"
			/>

			<div className="absolute inset-0 bg-linear-to-t from-neutral-950 via-neutral-950/55 to-neutral-950/10 transition-opacity duration-500 group-hover:opacity-80" />

			<div className="absolute right-0 bottom-0 left-0 z-10">
				<GlassSurface
					width="100%"
					height="auto"
					backgroundOpacity={0.05}
					borderRadius={0}
				>
					<div className="flex w-full flex-col items-start gap-3 mb-1 px-2 py-1">
						<div>
							<h3
								className={`text-sm leading-snug font-semibold text-white ${
									textAutoHide ? "text-clamp-1" : ""
								}`}
							>
								{project.title}
							</h3>

							<p
								className={`mt-0.5 text-xs leading-relaxed text-neutral-400 ${
									textAutoHide ? "text-clamp-2" : ""
								}`}
							>
								{project.description}
							</p>
						</div>

						{project.tags && project.tags.length > 0 && (
							<div className="flex flex-wrap gap-2">
								{project.tags.map((tag) => (
									<Badge
										variant="rotate-border"
										key={tag}
										className="rounded-full border border-white/8 bg-neutral-800/60 px-2 py-0.5 text-[10px] text-neutral-400"
									>
										{tag}
									</Badge>
								))}
							</div>
						)}

						<div className="flex w-full gap-2">
							<a
								href={project.href}
								target="_blank"
								rel="noopener noreferrer"
								onClick={(e) => e.stopPropagation()}
								className="flex h-8 min-w-30 w-full items-center justify-center gap-2 rounded-lg border border-amber-500/25 bg-orange-500/15 px-2.5 py-1 text-sm text-orange-300 transition-colors hover:bg-amber-500/25"
							>
								<ExternalLinkIcon size={12} />
								Demo
							</a>

							{project.github && (
								<a
									href={project.github}
									target="_blank"
									rel="noopener noreferrer"
									onClick={(e) => e.stopPropagation()}
									className="flex h-8 min-w-30 w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/7 px-2.5 py-1 text-sm font-medium text-neutral-400 transition-colors hover:bg-white/12"
								>
									<SiGithub size={12} />
									GitHub
								</a>
							)}
						</div>
					</div>
				</GlassSurface>
			</div>
		</div>
	);
}
