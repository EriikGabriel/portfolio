/** biome-ignore-all lint/suspicious/noArrayIndexKey: Needed for skeleton card keys */

"use client";
import { useProjectsTransition } from "@contexts/projects-transition";
import type { ReactNode } from "react";

export function ProjectGrid({ children }: { children: ReactNode }) {
	const { isPending } = useProjectsTransition();

	return (
		<div
			className={`transition-all duration-300 ${
				isPending
					? "pointer-events-none opacity-40 blur-[2px] scale-[0.99]"
					: "opacity-100 blur-0 scale-100"
			}`}
		>
			{children}
		</div>
	);
}
