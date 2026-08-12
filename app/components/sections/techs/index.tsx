"use client";

import {
	SiCss,
	SiGit,
	SiHtml5,
	SiNextdotjs,
	SiNodedotjs,
	SiPhp,
	SiPostgresql,
	SiPrisma,
	SiReact,
	SiSpring,
	SiTailwindcss,
	SiTypescript,
	SiUnity,
} from "@icons-pack/react-simple-icons";
import { CardBody, CardContainer, CardItem } from "@ui/3d-card";
import BorderGlow from "@ui/border-glow";
import GlassSurface from "@ui/glass-surface";
import { Lamp } from "@ui/lamp";
import Image from "next/image";
import type { ComponentType, SVGProps } from "react";
import { Motion } from "../../motion";

type Tech = {
	name: string;
} & (
	| {
			icon: ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;
			image?: never;
	  }
	| { image: string; icon?: never }
);

export function Techs() {
	const techs: Tech[] = [
		{ name: "HTML5", icon: SiHtml5 },
		{ name: "CSS3", icon: SiCss },
		{ name: "TypeScript", icon: SiTypescript },
		{ name: "React", icon: SiReact },
		{ name: "Next", icon: SiNextdotjs },
		{ name: "Node", icon: SiNodedotjs },
		{ name: "Prisma", icon: SiPrisma },
		{ name: "Java", image: "/icons/java.png" },
		{ name: "Spring Boot", icon: SiSpring },
		{ name: "MySQL", image: "/icons/mysql.png" },
		{ name: "PostgreSQL", icon: SiPostgresql },
		{ name: "Tailwind", icon: SiTailwindcss },

		{ name: "C#", image: "/icons/csharp.png" },
		{ name: "PHP", icon: SiPhp },
		{ name: "Unity", icon: SiUnity },
		{ name: "Git", icon: SiGit },
	];

	return (
		<section
			className="flex h-dvh w-full flex-col items-center gap-5 pt-24"
			id="skills"
		>
			<Lamp
				title="Minhas skills"
				subtitle="Algumas das tecnologias que utilizo"
			>
				<Motion
					initial={{ opacity: 0.5, y: 100 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{
						delay: 0.3,
						duration: 0.8,
						ease: "easeInOut",
					}}
					className="mt-8 grid grid-cols-8 w-3/5  flex-wrap justify-center  gap-y-10"
				>
					{techs.map((tech) => (
						<CardContainer className="flex flex-col gap-3" key={tech.name}>
							<BorderGlow
								edgeSensitivity={30}
								glowColor="40 80 80"
								borderRadius={14}
								glowRadius={40}
								glowIntensity={1}
								coneSpread={25}
								animated={false}
								colors={["#eec29f", "#ee6f35", "#d97706"]}
							>
								<CardBody className="group/card relative aspect-square h-fit w-20 rounded-xl hover:shadow-lg hover:shadow-neutral-500/10">
									<GlassSurface
										width="100%"
										height="100%"
										distortionScale={1}
										borderRadius={12}
										backgroundOpacity={1}
										className="absolute inset-0"
									>
										<CardItem
											translateZ="30"
											className="flex h-full w-full items-center justify-center py-3"
										>
											{tech.icon ? (
												<tech.icon
													size={40}
													aria-label={`Ícone do ${tech.name}`}
												/>
											) : (
												<Image
													src={tech.image}
													alt={`Ícone do ${tech.name}`}
													width={40}
													height={40}
													className="h-10 w-10 object-contain"
												/>
											)}
										</CardItem>
									</GlassSurface>
								</CardBody>
							</BorderGlow>
							<h3 className="text-lg font-medium text-neutral-300">
								{tech.name}
							</h3>
						</CardContainer>
					))}
				</Motion>
			</Lamp>
		</section>
	);
}
