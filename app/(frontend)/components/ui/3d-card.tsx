/** biome-ignore-all lint/a11y/noStaticElementInteractions: No need for static element interactions in this context */
/** biome-ignore-all lint/suspicious/noExplicitAny: No need for explicit any in this context */
"use client";

import { cn } from "@utils/cn";
import type React from "react";
import { createContext, useContext, useEffect, useRef, useState } from "react";

// Stable helper to format transform values (number -> adds unit, string -> used as-is)
const formatValue = (val: number | string, suffix = "px") =>
	typeof val === "number" ? `${val}${suffix}` : String(val ?? 0);

const MouseEnterContext = createContext<
	[boolean, React.Dispatch<React.SetStateAction<boolean>>] | undefined
>(undefined);

interface CardContainerProps extends React.HTMLAttributes<HTMLDivElement> {
	children?: React.ReactNode;
	className?: string;
	containerClassName?: string;
}

export const CardContainer = ({
	children,
	className,
	containerClassName,
	...props
}: CardContainerProps) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [isMouseEntered, setIsMouseEntered] = useState(false);

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!containerRef.current) return;
		const { left, top, width, height } =
			containerRef.current.getBoundingClientRect();
		const x = (e.clientX - left - width / 2) / 25;
		const y = (e.clientY - top - height / 2) / 25;
		containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
	};

	const handleMouseEnter = (_e: React.MouseEvent<HTMLDivElement>) => {
		setIsMouseEntered(true);
		if (!containerRef.current) return;
	};

	const handleMouseLeave = (_: React.MouseEvent<HTMLDivElement>) => {
		if (!containerRef.current) return;
		setIsMouseEntered(false);
		containerRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`;
	};
	return (
		<MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
			<div
				className={cn("flex items-center justify-center", containerClassName)}
				style={{
					perspective: "35px",
				}}
				{...props}
			>
				<div
					ref={containerRef}
					onMouseEnter={handleMouseEnter}
					onMouseMove={handleMouseMove}
					onMouseLeave={handleMouseLeave}
					className={cn(
						"relative flex items-center justify-center transition-all duration-200 ease-linear",
						className,
					)}
					style={{
						transformStyle: "preserve-3d",
					}}
				>
					{children}
				</div>
			</div>
		</MouseEnterContext.Provider>
	);
};

export const CardBody = ({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) => {
	return (
		<div
			className={cn("h-96 w-96", className)}
			style={{ transformStyle: "preserve-3d" }}
		>
			{children}
		</div>
	);
};

export const CardItem = ({
	as: Tag = "div",
	children,
	className,
	translateX = 0,
	translateY = 0,
	translateZ = 0,
	rotateX = 0,
	rotateY = 0,
	rotateZ = 0,
	...rest
}: {
	as?: React.ElementType;
	children: React.ReactNode;
	className?: string;
	translateX?: number | string;
	translateY?: number | string;
	translateZ?: number | string;
	rotateX?: number | string;
	rotateY?: number | string;
	rotateZ?: number | string;
	[key: string]: any;
}) => {
	const ref = useRef<HTMLDivElement>(null);
	const [isMouseEntered] = useMouseEnter();

	useEffect(() => {
		if (!ref.current) return;
		if (isMouseEntered) {
			const tx = formatValue(translateX, "px");
			const ty = formatValue(translateY, "px");
			const tz = formatValue(translateZ, "px");
			const rx = formatValue(rotateX, "deg");
			const ry = formatValue(rotateY, "deg");
			const rz = formatValue(rotateZ, "deg");
			ref.current.style.transform = `translateX(${tx}) translateY(${ty}) translateZ(${tz}) rotateX(${rx}) rotateY(${ry}) rotateZ(${rz})`;
		} else {
			ref.current.style.transform = `translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)`;
		}
	}, [
		isMouseEntered,
		translateX,
		translateY,
		translateZ,
		rotateX,
		rotateY,
		rotateZ,
	]);

	return (
		<Tag
			ref={ref as any}
			className={cn("w-fit transition duration-200 ease-linear", className)}
			{...rest}
		>
			{children}
		</Tag>
	);
};

// Create a hook to use the context
export const useMouseEnter = () => {
	const context = useContext(MouseEnterContext);
	if (context === undefined) {
		throw new Error("useMouseEnter must be used within a MouseEnterProvider");
	}
	return context;
};
