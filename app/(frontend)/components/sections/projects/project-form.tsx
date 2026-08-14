"use client";

import { useProjectsTransition } from "@contexts/projects-transition";
import { DropdownBlur, type DropdownBlurItem } from "@ui/dropdown-blur";
import { InputFocusBlur } from "@ui/input-focus-blur";
import { projectsSearchParams } from "@utils/search-params";
import { FilterIcon } from "lucide-react";
import { useQueryStates } from "nuqs";

interface ProjectFormProps {
	dropdownItems: DropdownBlurItem[];
}

export function ProjectForm({ dropdownItems }: ProjectFormProps) {
	const { startTransition } = useProjectsTransition();
	const [{ search, filter }, setParams] = useQueryStates(projectsSearchParams, {
		shallow: false,
		startTransition,
	});

	return (
		<div className="flex justify-center gap-5">
			<InputFocusBlur
				name="search-project"
				placeholder="Pesquisar projetos..."
				className="bg-white/10 backdrop-blur-md border-white/10 hover:bg-white/12 transition-colors placeholder:font-geist placeholder:tracking-normal"
				widthClassName="w-full max-w-[500px]"
				onChange={(e) => setParams({ search: e.currentTarget.value || null })}
				autoComplete="off"
				value={search || ""}
			/>
			<DropdownBlur
				icon={
					<FilterIcon size={14} className="text-neutral-400" id="filter-icon" />
				}
				items={dropdownItems}
				className="bg-white/10 backdrop-blur-md border-white/10 hover:bg-white/12 transition-colors"
				containerClassName="w-full max-w-[200px]"
				dropClassName="bg-white/10 backdrop-blur-md border-white/10"
				setFilter={(value) => setParams({ filter: value })}
				filter={filter}
			>
				Filtrar
			</DropdownBlur>
		</div>
	);
}
