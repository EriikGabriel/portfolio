"use client";

import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SiGithub, SiInstagram, SiX } from "@icons-pack/react-simple-icons";
import { AnimatedTooltip } from "@ui/animated-tooltip";
import { LinkPreview } from "@ui/link-preview";
import { useState } from "react";
import { SocialCard } from "./social-card";

const medias = [
	{
		icon: <SiGithub className="size-14 p-2 object-contain text-white/60" />,
		url: "https://github.com/EriikGabriel",
		title: "Github",
		desc: "EriikGabriel",
	},
	{
		icon: <SiInstagram className="size-14 p-2 object-contain text-white/60" />,
		url: "https://www.instagram.com/eriikgaabriel/",
		title: "Instagram",
		desc: "@eriikgaabriel",
	},
	{
		icon: <SiX className="size-14 p-2 object-contain text-white/60" />,
		url: "https://www.x.com/canopuskire/",
		title: "X",
		desc: "@canopuskire",
	},
	{
		icon: (
			<FontAwesomeIcon icon={faLinkedin} className="size-12! text-white/60" />
		),
		url: "https://www.linkedin.com/in/erikgabrielsilva/",
		title: "LinkedIn",
		desc: "erikgabrielsilva",
	},
];

export function SocialMedias() {
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
	return (
		<div className="flex justify-center gap-12 w-full">
			{medias.map((media, i) => (
				<LinkPreview
					hover={{
						index: i,
						setIndex: setHoveredIndex,
					}}
					key={media.title}
					url={media.url}
				>
					<AnimatedTooltip
						hover={{
							index: hoveredIndex,
							setIndex: setHoveredIndex,
						}}
						items={[
							{
								id: i,
								title: media.title,
								desc: media.desc,
								url: media.url,
							},
						]}
					>
						<SocialCard icon={media.icon} />
					</AnimatedTooltip>
				</LinkPreview>
			))}
		</div>
	);
}
