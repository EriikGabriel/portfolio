/** biome-ignore-all lint/suspicious/noArrayIndexKey: The index is used as a key for the badge component. */

"use client";

import type { Project } from "@payload/payload-types";
import { Badge } from "@ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@ui/tooltip";
import type { Populated } from "@utils/payload";
import { useLayoutEffect, useRef, useState } from "react";

const badgeClassName =
	"shrink-0 rounded-full border border-white/8 bg-neutral-800/60 px-2 py-0.5 text-[10px] text-neutral-400";

export function ProjectTags({ tags }: { tags: Populated<Project["tags"]> }) {
	const containerRef = useRef<HTMLDivElement>(null);
	const measurementRef = useRef<HTMLDivElement>(null);
	const [visibleCount, setVisibleCount] = useState(tags.length);

	useLayoutEffect(() => {
		const container = containerRef.current;
		const measurement = measurementRef.current;

		if (!container || !measurement) return;

		const calculate = () => {
			const availableWidth = container.clientWidth;
			const elements = Array.from(
				measurement.querySelectorAll<HTMLElement>("[data-tag-width]"),
			);

			const widths = elements.map(
				(element) => element.getBoundingClientRect().width,
			);

			const plusElements = Array.from(
				measurement.querySelectorAll<HTMLElement>("[data-plus-width]"),
			);

			const plusWidths = plusElements.map(
				(element) => element.getBoundingClientRect().width,
			);

			const gap = 8;
			let usedWidth = 0;
			let count = 0;

			for (let i = 0; i < widths.length; i++) {
				const remaining = widths.length - (i + 1);
				const plusWidth = remaining > 0 ? (plusWidths[remaining - 1] ?? 0) : 0;

				const nextWidth = usedWidth + (count > 0 ? gap : 0) + widths[i];

				const totalWidth = nextWidth + (remaining > 0 ? gap + plusWidth : 0);

				if (totalWidth > availableWidth) {
					break;
				}

				usedWidth = nextWidth;
				count++;
			}

			setVisibleCount(count);
		};

		calculate();

		const observer = new ResizeObserver(calculate);
		observer.observe(container);

		return () => observer.disconnect();
	}, []);

	const visibleTags = tags.slice(0, visibleCount);
	const hiddenCount = tags.length - visibleCount;

	return (
		<div ref={containerRef} className="relative w-full overflow-hidden">
			<div className="flex flex-nowrap gap-2">
				{visibleTags.map((tag) => (
					<Badge
						variant="rotate-border"
						key={tag.id}
						className={badgeClassName}
					>
						{tag.title}
					</Badge>
				))}

				{hiddenCount > 0 && (
					<Tooltip>
						<TooltipTrigger className="cursor-default">
							<Badge variant="rotate-border" className={badgeClassName}>
								+{hiddenCount}
							</Badge>
						</TooltipTrigger>
						<TooltipContent className="bg-transparent flex gap-1">
							{tags.slice(visibleCount).map((tag) => (
								<Badge
									variant="rotate-border"
									key={tag.id}
									className={badgeClassName}
								>
									{tag.title}
								</Badge>
							))}
						</TooltipContent>
					</Tooltip>
				)}
			</div>

			{/* Elementos usados apenas para medir as larguras */}
			<div
				ref={measurementRef}
				aria-hidden
				className="pointer-events-none absolute top-0 left-0 flex w-max gap-2 opacity-0"
			>
				{tags.map((tag) => (
					<Badge
						variant="rotate-border"
						key={tag.id}
						data-tag-width
						className={badgeClassName}
					>
						{tag.title}
					</Badge>
				))}

				{Array.from({ length: tags.length }, (_, i) => (
					<Badge
						variant="rotate-border"
						key={`plus-${i + 1}`}
						data-plus-width
						className={badgeClassName}
					>
						+{i + 1}
					</Badge>
				))}
			</div>
		</div>
	);
}
