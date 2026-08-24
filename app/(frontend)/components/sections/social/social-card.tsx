import { Icon } from "@iconify/react";
import { GlareCard } from "@ui/effects/glare-card";
import GlassSurface from "@ui/effects/glass-surface";

interface SocialCardProps {
	icon: string;
}

export function SocialCard({ icon }: SocialCardProps) {
	return (
		<GlassSurface
			distortionScale={1}
			borderRadius={12}
			backgroundOpacity={1}
			className="absolute inset-0 size-16 md:size-20!"
		>
			<GlareCard className="flex h-full w-full items-center justify-center py-2 md:py-3">
				<Icon
					icon={icon}
					className="size-12 md:size-16 p-2 object-contain text-white/60"
				/>
			</GlareCard>
		</GlassSurface>
	);
}
