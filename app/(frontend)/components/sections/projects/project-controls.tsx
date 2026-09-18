"use client";

import { useQueryStates } from "nuqs";
import { projectsSearchParams } from "@utils/search-params";
import {
	ChevronsLeft,
	ChevronLeft,
	ChevronRight,
	ChevronsRight,
} from "lucide-react";

type ProjectControlsProps = {
	totalDocs: number;
	pageSize: number;
};

export function ProjectControls({ totalDocs, pageSize }: ProjectControlsProps) {
	const [{ page }, setParams] = useQueryStates(projectsSearchParams, {
		shallow: false,
	});

	const pageNum = Number(page) || 1;
	const totalPages = Math.max(1, Math.ceil(totalDocs / pageSize));

	const isFirstPage = pageNum <= 1;
	const isLastPage = pageNum >= totalPages;

	const goTo = (target: number) => {
		const clamped = Math.min(Math.max(1, target), totalPages);
		setParams({ page: String(clamped) });
	};

	return (
		<div className="flex items-center justify-center gap-3 mt-4 p-2 rounded-md">
			<button
				type="button"
				onClick={() => goTo(1)}
				disabled={isFirstPage}
				aria-label="Primeira página"
				className="flex h-fit w-min items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/10 px-2.5 py-1 text-sm font-medium text-neutral-400 transition-colors hover:bg-white/12 disabled:text-white/10 disabled:hover:bg-white/10 disabled:cursor-not-allowed"
			>
				<ChevronsLeft size={20} />
			</button>

			<button
				type="button"
				onClick={() => goTo(pageNum - 1)}
				disabled={isFirstPage}
				aria-label="Página anterior"
				className="flex h-fit w-min items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/10 px-2.5 py-1 text-sm font-medium text-neutral-400 transition-colors hover:bg-white/12 disabled:text-white/10 disabled:hover:bg-white/10 disabled:cursor-not-allowed"
			>
				<ChevronLeft size={20} className="" />
			</button>

			<span className="text-sm px-2 select-none tabular-nums">
				{pageNum} / {totalPages}
			</span>

			<button
				type="button"
				onClick={() => goTo(pageNum + 1)}
				disabled={isLastPage}
				aria-label="Próxima página"
				className="flex h-fit w-min items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/10 px-2.5 py-1 text-sm font-medium text-neutral-400 transition-colors hover:bg-white/12 disabled:text-white/10 disabled:hover:bg-white/10 disabled:cursor-not-allowed"
			>
				<ChevronRight size={20} />
			</button>

			<button
				type="button"
				onClick={() => goTo(totalPages)}
				disabled={isLastPage}
				aria-label="Última página"
				className="flex h-fit w-min items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/10 px-2.5 py-1 text-sm font-medium text-neutral-400 transition-colors hover:bg-white/12 disabled:text-white/10 disabled:hover:bg-white/10 disabled:cursor-not-allowed"
			>
				<ChevronsRight size={20} />
			</button>
		</div>
	);
}
