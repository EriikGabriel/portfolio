import type React from "react";

export interface GlassSurfaceProps
	extends React.HTMLAttributes<HTMLDivElement> {
	children?: React.ReactNode;
	width?: number | string;
	height?: number | string;
	borderRadius?: number;
	/**
	 * Props legadas do modo SVG (`backdrop-filter: url(#filter)`), que só era
	 * ativado no Chromium e causava artefatos/flicker. Mantidas na API por
	 * compatibilidade com os chamadores, mas inertes: todos os engines agora
	 * usam o mesmo fallback estável de blur.
	 */
	borderWidth?: number;
	brightness?: number;
	opacity?: number;
	blur?: number;
	displace?: number;
	backgroundOpacity?: number;
	saturation?: number;
	distortionScale?: number;
	redOffset?: number;
	greenOffset?: number;
	blueOffset?: number;
	xChannel?: "R" | "G" | "B";
	yChannel?: "R" | "G" | "B";
	mixBlendMode?:
		| "normal"
		| "multiply"
		| "screen"
		| "overlay"
		| "darken"
		| "lighten"
		| "color-dodge"
		| "color-burn"
		| "hard-light"
		| "soft-light"
		| "difference"
		| "exclusion"
		| "hue"
		| "saturation"
		| "color"
		| "luminosity"
		| "plus-darker"
		| "plus-lighter";
}

/**
 * Superfície de vidro estável e cross-browser (Chromium, Firefox, WebKit).
 * Usa apenas `backdrop-filter` padrão (com prefixo -webkit para WebKit antigo).
 */
const GlassSurface: React.FC<GlassSurfaceProps> = ({
	children,
	width,
	height,
	borderRadius = 20,
	className = "",
	style = {},
}) => {
	const containerStyles: React.CSSProperties = {
		...style,
		width: typeof width === "number" ? `${width}px` : width,
		height: typeof height === "number" ? `${height}px` : height,
		borderRadius: `${borderRadius}px`,
		background: "rgba(255, 255, 255, 0.1)",
		backdropFilter: "blur(12px) saturate(1.8) brightness(1.2)",
		WebkitBackdropFilter: "blur(12px) saturate(1.8) brightness(1.2)",
		border: "1px solid rgba(255, 255, 255, 0.2)",
		boxShadow:
			"inset 0 1px 0 0 rgba(255, 255, 255, 0.2), inset 0 -1px 0 0 rgba(255, 255, 255, 0.1)",
	};

	const glassSurfaceClasses =
		"relative flex items-center justify-center overflow-hidden transition-opacity duration-[260ms] ease-out focus-visible:outline-2 focus-visible:outline-[#0A84FF] focus-visible:outline-offset-2";

	return (
		<div className={`${glassSurfaceClasses} ${className}`} style={containerStyles}>
			<div className="w-full h-full flex items-center justify-center rounded-[inherit] relative z-10">
				{children}
			</div>
		</div>
	);
};

export default GlassSurface;
