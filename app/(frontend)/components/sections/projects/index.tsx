import { ProjectsTransitionProvider } from "@contexts/projects-transition";
import { findPopulated } from "@frontend/utils/payload";
import config from "@payload-config";
import { Lamp } from "@ui/lamp";
import MagicBento from "@ui/magic-bento";
import { projectsSearchParamsCache } from "@utils/search-params";
import type { Where } from "payload";
import { getPayload } from "payload";
import { Motion } from "../../motion";
import { dropdownItems } from "./project-dropdown";
import { buildTagLookup, filterProjectsByTag } from "./project-filters";
import { ProjectForm } from "./project-form";
import { ProjectGrid } from "./project-grid";

interface ProjectsProps {
	searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function Projects({ searchParams }: ProjectsProps) {
	const { search, filter } = projectsSearchParamsCache.parse(
		await searchParams,
	);

	const where: Where = {
		enabled: { equals: true },
		...(search
			? {
					or: [{ title: { like: search } }, { description: { like: search } }],
				}
			: {}),
	};

	const projects = await findPopulated({
		collection: "projects",
		depth: 1,
		limit: filter ? 0 : 5,
		where,
	});

	let filteredDocs = projects.docs;

	if (filter) {
		const payload = await getPayload({ config });

		const knownNames = dropdownItems
			.filter((item) => item.value !== "other")
			.map((item) => item.name);

		const knownTags = await payload.find({
			collection: "tags",
			where: { title: { in: knownNames } },
			limit: 0,
			depth: 0,
		});

		const lookup = buildTagLookup(dropdownItems, knownTags.docs);
		filteredDocs = filterProjectsByTag(projects.docs, filter, lookup).slice(
			0,
			5,
		);
	}

	return (
		<section
			className="relative flex min-h-dvh w-full flex-col items-center gap-5 pt-24"
			id="projects"
		>
			<Lamp
				title="Meus projetos"
				subtitle="Alguns projetos desenvolvidos por mim"
			>
				<Motion
				initial={{ opacity: 0, y: 40 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
					transition={{ delay: 0.2, duration: 0.6, ease: "easeInOut" }}
					className="mt-8 flex w-full max-w-4xl flex-col gap-6 px-4"
				>
					<ProjectsTransitionProvider>
						<ProjectForm dropdownItems={dropdownItems} />
						<ProjectGrid>
							<MagicBento
								projects={filteredDocs}
								glowColor="246, 120, 0"
								spotlightRadius={400}
								particleCount={12}
								enableTilt={false}
								enableStars
								enableMagnetism
								enableSpotlight
								enableBorderGlow
								textAutoHide
							/>
						</ProjectGrid>
					</ProjectsTransitionProvider>
				</Motion>
			</Lamp>
		</section>
	);
}
