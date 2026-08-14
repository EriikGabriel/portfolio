"use client";

import type { Populated } from "@frontend/utils/payload";
import { Icon } from "@iconify/react";
import type { Project } from "@payload/payload-types";
import GlassSurface from "@ui/glass-surface";
import Image from "next/image";
import { ProjectTags } from "./project-tags";

interface ProjectCardProps {
	project: Populated<Project>;
	textAutoHide?: boolean;
}

const blackPlaceholder =
	"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1600' height='900' viewBox='0 0 1600 900'%3E%3Crect width='1600' height='900' fill='%23000000'/%3E%3C/svg%3E";

export function ProjectCard({ project, textAutoHide }: ProjectCardProps) {
	return (
		<div className="group relative h-full w-full">
			<Image
				src={project.image?.url ?? blackPlaceholder}
				alt={`Preview de ${project.title}`}
				sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
				className="scale-[1.06] object-cover opacity-30 transition-all duration-700 ease-out group-hover:scale-100 group-hover:opacity-50"
				unoptimized={!project.image}
				fill
			/>

			<div className="absolute inset-0 bg-linear-to-t from-neutral-950 via-neutral-950/55 to-neutral-950/10 transition-opacity duration-500 group-hover:opacity-80" />

			<div className="absolute right-0 bottom-0 left-0 z-10">
				<GlassSurface
					width="100%"
					height="auto"
					backgroundOpacity={0.05}
					borderRadius={0}
				>
					<div className="mb-1 flex w-full flex-col items-start gap-3 px-2 py-1">
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
									textAutoHide ? "text-clamp-1" : ""
								}`}
							>
								{project.description}
							</p>
						</div>

						{project.tags && project.tags.length > 0 && (
							<ProjectTags tags={project.tags} />
						)}

						<div className="flex w-full gap-2">
							{project.demo && (
								<a
									href={project.demo}
									target="_blank"
									rel="noopener noreferrer"
									onClick={(e) => e.stopPropagation()}
									className="flex h-8 min-w-30 w-full items-center justify-center gap-2 rounded-lg border border-amber-500/25 bg-orange-500/15 px-2.5 py-1 text-sm text-orange-300 transition-colors hover:bg-amber-500/25"
								>
									<Icon icon="gridicons:external" fontSize={12} />
									Demo
								</a>
							)}

							<a
								href={project.github}
								target="_blank"
								rel="noopener noreferrer"
								onClick={(e) => e.stopPropagation()}
								className="flex h-8 min-w-30 w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/7 px-2.5 py-1 text-sm font-medium text-neutral-400 transition-colors hover:bg-white/12"
							>
								<Icon icon="simple-icons:github" fontSize={12} />
								GitHub
							</a>
						</div>
					</div>
				</GlassSurface>
			</div>
		</div>
	);
}
