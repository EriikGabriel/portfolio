import type { DropdownBlurItem } from "@ui/dropdown-blur";
import {
	CpuIcon,
	Gamepad2Icon,
	MonitorIcon,
	SmartphoneIcon,
} from "lucide-react";

export const dropdownItems: DropdownBlurItem[] = [
	{ icon: <MonitorIcon size={16} />, name: "Aplicação Web", value: "web" },
	{
		icon: <SmartphoneIcon size={16} />,
		name: "Aplicação Mobile",
		value: "mobile",
	},
	{ icon: <Gamepad2Icon size={16} />, name: "Jogo", value: "game" },
	{ icon: <CpuIcon size={16} />, name: "Outros", value: "other" },
];
