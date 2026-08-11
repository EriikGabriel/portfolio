import { GlareCard } from "@ui/glare-card";
import GlassSurface from "@ui/glass-surface";

interface SocialCardProps {
	icon: React.ReactNode;
}

export function SocialCard({ icon }: SocialCardProps) {
	return (
		<GlassSurface
			distortionScale={1}
			borderRadius={12}
			backgroundOpacity={1}
			className="absolute inset-0 size-20!"
		>
			<GlareCard className="flex h-full w-full items-center justify-center py-3">
				{icon}
			</GlareCard>
		</GlassSurface>
	);
}
