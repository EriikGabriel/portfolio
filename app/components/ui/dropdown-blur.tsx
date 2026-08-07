/** biome-ignore-all lint/a11y/noStaticElementInteractions: No need for static element interactions in this context */
/** biome-ignore-all lint/a11y/useKeyWithClickEvents: No need for key events in this context */
"use client";

import { cn } from "@utils/cn";
import { motion, stagger, useAnimate } from "framer-motion";
import { ChevronRightIcon, CircleXIcon } from "lucide-react";
import { useEffect, useState } from "react";

function useMenuAnimation(isOpen: boolean) {
	const [scope, animate] = useAnimate();

	const staggerMenuItems = stagger(0.1, { startDelay: 0.15 });

	useEffect(() => {
		animate(
			"ul",
			{
				clipPath: isOpen
					? "inset(0% 0% 0% 0% round 12px)"
					: "inset(10% 50% 90% 50% round 12px)",
			},
			{
				type: "spring",
				bounce: 0,
				duration: 0.5,
			},
		);

		animate(
			"li",
			isOpen
				? { opacity: 1, scale: 1, filter: "blur(0px)" }
				: { opacity: 0, scale: 0.3, filter: "blur(20px)" },
			{
				duration: 0.2,
				delay: isOpen ? staggerMenuItems : 0,
			},
		);
	}, [isOpen, animate, staggerMenuItems]);

	return scope;
}

type DropdownBlurItem = {
	icon: React.ReactNode;
	name: string;
	customStyle?: string;
};

type DropdownBlurProps = {
	items: DropdownBlurItem[];
	icon?: React.ReactNode;
	containerClassName?: string;
	itemClassName?: string;
	widthClassName?: string;
	className?: string;
	children: React.ReactNode;
	setFilter?: (filter: string | null) => void;
	filter?: string | null;
};

export function DropdownBlur({
	items,
	icon,
	containerClassName,
	itemClassName,
	widthClassName,
	className,
	children,
	setFilter,
	filter,
}: DropdownBlurProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState<DropdownBlurItem>(
		{} as DropdownBlurItem,
	);

	const scope = useMenuAnimation(isOpen);

	const handleSelectItem = (item: DropdownBlurItem) => {
		setSelectedItem(item);
		if (setFilter) setFilter(item.name);
		setIsOpen(false);
	};

	return (
		<nav
			className={cn(
				"w-full space-y-2 tracking-normal",
				containerClassName,
				widthClassName,
			)}
			ref={scope}
		>
			<motion.button
				type="button"
				whileTap={{ scale: 0.97 }}
				className={cn(
					"flex w-full items-center justify-between rounded-xl border border-neutral-800 bg-neutral-900 p-2.5",
					className,
				)}
				onClick={() => setIsOpen((prevState) => !prevState)}
			>
				<span className="text-sm font-medium text-neutral-400">
					{filter || children}
				</span>

				<div className="flex gap-2">
					<div
						onClick={() => {
							if (selectedItem.icon) {
								setSelectedItem({} as DropdownBlurItem);
								if (setFilter) setFilter(null);
							}
						}}
						style={{ transformOrigin: "50% 55%" }}
						className="p-1 text-neutral-400"
					>
						{filter ? <CircleXIcon size={16} /> : icon}
					</div>
				</div>
			</motion.button>
			<ul
				className={cn(
					"absolute z-[1] w-full max-w-[200px] space-y-3 rounded-xl border border-neutral-800 bg-neutral-900 p-2.5",
					isOpen ? "pointer-events-auto" : "pointer-events-none",
					widthClassName,
					className,
				)}
				style={{
					clipPath: "inset(10% 50% 90% 50% round 12px)",
				}}
			>
				{items.map(({ icon, name, customStyle }) => (
					<li key={name}>
						<button
							type="button"
							className={cn(
								"group flex items-center gap-2 rounded-md border border-transparent text-neutral-400 hover:text-neutral-300 focus-visible:border-neutral-800 focus-visible:text-neutral-300 focus-visible:outline-none",
								itemClassName,
								customStyle,
							)}
							onClick={() => handleSelectItem({ icon, name })}
						>
							<span>{icon}</span>
							<span className="flex items-center gap-1 text-sm font-medium">
								{name}
								<ChevronRightIcon
									size={12}
									className="-translate-x-1 scale-0 opacity-0 transition-all group-hover:translate-x-0 group-hover:scale-100 group-hover:opacity-100"
								/>
							</span>
						</button>
					</li>
				))}
			</ul>
		</nav>
	);
}
