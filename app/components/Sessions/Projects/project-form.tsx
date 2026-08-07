"use client";

import { DropdownBlur } from "@ui/dropdown-blur";
import { InputFocusBlur } from "@ui/input-focus-blur";
import {
	CpuIcon,
	FilterIcon,
	Gamepad2Icon,
	MonitorIcon,
	SmartphoneIcon,
} from "lucide-react";
import { useQueryState } from "nuqs";

const dropdownItems = [
	{ icon: <MonitorIcon size={16} />, name: "Aplicação Web" },
	{ icon: <SmartphoneIcon size={16} />, name: "Aplicação Mobile" },
	{ icon: <Gamepad2Icon size={16} />, name: "Jogo" },
	{ icon: <CpuIcon size={16} />, name: "Outros" },
];

export function ProjectForm() {
	const [search, setSearch] = useQueryState("search");
	const [filter, setFilter] = useQueryState("filter");

	return (
		<div className="flex justify-center gap-5">
			<InputFocusBlur
				name="search-project"
				placeholder="Pesquisar projetos..."
				className="bg-neutral-900/60 backdrop-blur-md placeholder:font-geist placeholder:tracking-normal"
				widthClassName="w-full max-w-[500px]"
				onChange={(e) => setSearch(e.currentTarget.value || null)}
				autoComplete="off"
				value={search || ""}
			/>
			<DropdownBlur
				icon={
					<FilterIcon size={14} className="text-neutral-400" id="filter-icon" />
				}
				items={dropdownItems}
				className="bg-neutral-900/60 backdrop-blur-md"
				widthClassName="max-w-[200px]"
				setFilter={setFilter}
				filter={filter}
			>
				Filtrar
			</DropdownBlur>
		</div>
	);
}
