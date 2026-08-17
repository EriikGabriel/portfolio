"use client";

import SpecularButton from "@ui/specular-button";
import { scrollToSection } from "@utils/nav";

export function ProjectsButton() {
	return (
		<SpecularButton
			onClick={() => scrollToSection("projects")}
			size="lg"
			radius={12}
			tint="#ffffff"
			tintOpacity={0}
			blur={0}
			textColor="#f5f5f5"
			lineColor="#f67800"
			baseColor="#525252"
			intensity={1}
			shineSize={10}
			shineFade={40}
			thickness={1}
			speed={0.35}
			followMouse
			proximity={250}
			className="text-[0.9rem]! px-6! py-3! md:text-[1.15rem]! md:px-10! md:py-4.5!"
		>
			Veja meus projetos
		</SpecularButton>
	);
}
