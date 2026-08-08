"use client";

import { CardBody, CardContainer, CardItem } from "@ui/3d-card";
import { Lamp } from "@ui/lamp";

import Image from "next/image";
import { Motion } from "../../Motion";

export function Techs() {
	const techs = [
		{ name: "TypeScript", icon: "typescript.png" },
		{ name: "React", icon: "react.png" },
		{ name: "Next", icon: "next.png" },
		{ name: "Node", icon: "node.png" },
		{ name: "MySQL", icon: "mysql.png" },
		{ name: "C#", icon: "csharp.png" },
		{ name: "Unity", icon: "unity.png" },
		{ name: "Git", icon: "git.png" },
	];

	return (
		<section className="flex h-dvh w-full flex-col items-center gap-5 pt-24">
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
					className="mt-8 flex w-3/5 justify-center gap-5 bg-linear-to-br from-slate-300 to-slate-500 bg-clip-text py-4 text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
				>
					{techs.map(({ name, icon }) => (
						<CardContainer className="flex w-full flex-col gap-3" key={name}>
							<CardBody className="group/card relative flex aspect-square h-fit w-20 flex-col items-center justify-center gap-3 rounded-xl border border-foreground/40 bg-neutral-900/20 py-3 backdrop-blur-lg hover:shadow-lg hover:shadow-neutral-500/10">
								<CardItem translateZ="30">
									<Image
										src={`/icons/${icon}`}
										alt={`Ícone do ${name}`}
										width={48}
										height={48}
										className="h-12 w-12"
									/>
								</CardItem>
							</CardBody>
							<h3 className="text-lg font-medium text-neutral-300">{name}</h3>
						</CardContainer>
					))}
				</Motion>
			</Lamp>
		</section>
	);
}
