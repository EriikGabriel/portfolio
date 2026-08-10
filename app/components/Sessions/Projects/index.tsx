import { Lamp } from "@ui/lamp";
import { Motion } from "../../Motion";
import { ProjectCard } from "./project-card";
import { ProjectForm } from "./project-form";

type ProjectsType = {
	title: string;
	description: string;
	href: string;
	github?: string;
	cover?: string;
	tags?: string[];
	featured?: boolean;
};

export function Projects() {
	const projects: ProjectsType[] = [
		{
			title: "teste1",
			description: "teste1",
			href: "https://twitter.com/mannupaaji",
			github: "https://github.com",
			tags: ["Next.js", "TypeScript", "Tailwind"],
			featured: true,
		},
		{
			title: "teste2",
			description: "teste2",
			href: "https://twitter.com/mannupaaji",
			tags: ["React", "Node.js"],
		},
		{
			title: "teste3",
			description: "teste3",
			href: "https://twitter.com/mannupaaji",
			github: "https://github.com",
			tags: ["C#", "Unity"],
		},
	];

	return (
		<section className="relative flex min-h-dvh w-full flex-col items-center gap-5 pt-24 overflow-hidden">
			<Lamp
				title="Meus projetos"
				subtitle="Alguns projetos desenvolvidos por mim"
			>
				<Motion
					initial={{ opacity: 0, y: 40 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2, duration: 0.6, ease: "easeInOut" }}
					className="mt-8 flex w-full max-w-4xl flex-col gap-6 px-4"
				>
					<ProjectForm />

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{projects.map((project, i) => (
							<ProjectCard key={project.title} {...project} index={i} />
						))}
					</div>
				</Motion>
			</Lamp>
		</section>
	);
}
