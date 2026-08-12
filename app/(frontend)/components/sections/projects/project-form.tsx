"use client";

import { DropdownBlur, type DropdownBlurItem } from "@ui/dropdown-blur";
import { InputFocusBlur } from "@ui/input-focus-blur";
import {
	CpuIcon,
	FilterIcon,
	Gamepad2Icon,
	MonitorIcon,
	SmartphoneIcon,
} from "lucide-react";
import { useQueryState } from "nuqs";

const dropdownItems: DropdownBlurItem[] = [
	{ icon: <MonitorIcon size={16} />, name: "Aplicação Web", value: "web" },
	{
		icon: <SmartphoneIcon size={16} />,
		name: "Aplicação Mobile",
		value: "mobile",
	},
	{ icon: <Gamepad2Icon size={16} />, name: "Jogo", value: "game" },
	{ icon: <CpuIcon size={16} />, name: "Outros", value: "other" },
];

export function ProjectForm() {
	const [search, setSearch] = useQueryState("search");
	const [filter, setFilter] = useQueryState("filter");

	return (
		<div className="flex justify-center gap-5">
			<InputFocusBlur
				name="search-project"
				placeholder="Pesquisar projetos..."
				className="bg-white/10 backdrop-blur-md border-white/10 hover:bg-white/12 transition-colors placeholder:font-geist placeholder:tracking-normal"
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
				className="bg-white/10 backdrop-blur-md border-white/10 hover:bg-white/12 transition-colors"
				containerClassName="w-full max-w-[200px]"
				dropClassName="bg-white/10 backdrop-blur-md border-white/10"
				setFilter={setFilter}
				filter={filter}
			>
				Filtrar
			</DropdownBlur>
		</div>
	);
}
