"use client";

import { AnimatedTooltip } from "@ui/effects/animated-tooltip";
import { LinkPreview } from "@ui/effects/link-preview";
import { socialMedias } from "@utils/social";
import { useState } from "react";
import { SocialCard } from "./social-card";

export function SocialMedias() {
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

	return (
		<div className="flex justify-center gap-6 md:gap-12 w-full">
			{socialMedias.map((media, i) => (
				<LinkPreview
					hover={{
						index: i,
						setIndex: setHoveredIndex,
					}}
					key={media.name}
					url={media.url}
					{...(media.imageSrc
						? { imageSrc: media.imageSrc, isStatic: true }
						: { isStatic: false })}
				>
					<AnimatedTooltip
						hover={{
							index: hoveredIndex,
							setIndex: setHoveredIndex,
						}}
						items={[
							{
								id: i,
								title: media.name,
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
