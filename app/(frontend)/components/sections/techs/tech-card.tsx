"use client";

import { Icon } from "@iconify/react";
import type { Tech } from "@payload/payload-types";
import { CardBody, CardContainer, CardItem } from "@ui/3d-card";
import BorderGlow from "@ui/border-glow";
import GlassSurface from "@ui/glass-surface";

interface TechCardProps {
	tech: Tech;
}

export function TechCard({ tech }: TechCardProps) {
	return (
		<CardContainer
			className="flex flex-col gap-3 cursor-pointer"
			key={tech.name}
			onClick={() => window.open(tech.url, "_blank", "noopener,noreferrer")}
		>
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
							{tech.icon && <Icon icon={tech.icon} fontSize={40} />}
						</CardItem>
					</GlassSurface>
				</CardBody>
			</BorderGlow>
			<h3 className="text-lg font-medium text-neutral-300">{tech.name}</h3>
		</CardContainer>
	);
}
