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
				className="bg-neutral-900/10 border-neutral-600 supports-backdrop-filter:backdrop-blur-md [@-moz-document_url-prefix()]:bg-neutral-900/10 [@-moz-document_url-prefix()]:backdrop-blur-md placeholder:font-geist placeholder:tracking-normal"
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
				className="bg-neutral-900/10 border-neutral-600 supports-backdrop-filter:backdrop-blur-md"
				containerClassName="w-full max-w-[200px]"
				dropClassName="bg-neutral-500/10"
				setFilter={setFilter}
				filter={filter}
			>
				Filtrar
			</DropdownBlur>
		</div>
	);
}
