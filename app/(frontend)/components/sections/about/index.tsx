import { Motion } from "@components/motion";
import configPromise from "@payload-config";
import { EvervaultCard, Icon } from "@ui/evervault-card";
import { Lamp } from "@ui/lamp";
import Image from "next/image";
import { getPayload } from "payload";
import type { Tech } from "@/app/(payload)/payload-types";

export async function About() {
	const payload = await getPayload({ config: configPromise });

	const about = await payload.findGlobal({ slug: "about", depth: 1 });
	const techs = about.techs as Tech[];

	return (
		<section
			className="flex h-dvh w-full flex-col items-center gap-5 pt-24"
			id="about"
		>
			<Lamp title="Quem sou?" subtitle="Um pouco sobre mim">
				<Motion
					initial={{ opacity: 0.5, y: 100 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{
						delay: 0.3,
						duration: 0.8,
						ease: "easeInOut",
					}}
					className="mt-8 w-3/5 bg-linear-to-br from-slate-300 to-slate-500 bg-clip-text py-4 text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
				>
					<div className="relative flex w-full items-center gap-10 border border-white/20 p-4">
						<Icon className="absolute -left-3 -top-3 h-6 w-6 text-white" />
						<Icon className="absolute -bottom-3 -left-3 h-6 w-6 text-white" />
						<Icon className="absolute -right-3 -top-3 h-6 w-6 text-white" />
						<Icon className="absolute -bottom-3 -right-3 h-6 w-6 text-white" />

						<EvervaultCard className="h-96 w-3/4">
							<Image
								src="/assets/me.jpeg"
								alt="Me"
								width={200}
								height={200}
								className="h-full w-full rounded-full shadow-lg shadow-orange-500/20"
							></Image>
						</EvervaultCard>

						<div className="flex h-full w-full flex-col justify-center gap-3 text-start text-white">
							<h1 className="text-bright-primary text-5xl">{about.greeting}</h1>
							<p className="pr-5 font-geist text-xl font-normal tracking-tight">
								{about.description}{" "}
								{techs.map((tech, i) => (
									<a key={tech.id} className="text-primary" href={tech.url}>
										{tech.name}
										{i !== techs.length - 1 && ", "}
									</a>
								))}
							</p>
						</div>
					</div>
				</Motion>
			</Lamp>
		</section>
	);
}
