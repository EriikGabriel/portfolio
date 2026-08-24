import configPromise from "@payload-config";
import { Lamp } from "@ui/lamp";
import { getPayload } from "payload";
import { Motion } from "../../motion";
import { TechCard } from "./tech-card";

export async function Techs() {
	const payload = await getPayload({ config: configPromise });
	const techs = await payload.find({
		collection: "techs",
		depth: 1,
		limit: 20,
	});

	return (
		<section
			className="flex min-h-dvh w-full flex-col items-center gap-5 pt-24"
			id="skills"
		>
			<Lamp
				title="Minhas skills"
				subtitle="Algumas das tecnologias que utilizo"
			>
				<Motion
				initial={{ opacity: 0.5, y: 100 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
					transition={{
						delay: 0.3,
						duration: 0.8,
						ease: "easeInOut",
					}}
					className="mt-8 grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 xl:grid-cols-8 w-full md:w-3/5 justify-items-center gap-x-1 gap-y-6 md:gap-x-2 md:gap-y-10"
				>
					{techs.docs.map((tech) => (
						<TechCard tech={tech} key={tech.name} />
					))}
				</Motion>
			</Lamp>
		</section>
	);
}
