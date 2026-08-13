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
					{techs.docs.map((tech) => (
						<TechCard tech={tech} key={tech.name} />
					))}
				</Motion>
			</Lamp>
		</section>
	);
}
