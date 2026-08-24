import { socialMedias } from "./social";

export const siteUrl = (
	process.env.NEXT_PUBLIC_SERVER_URL || "https://erikgabriel.vercel.app"
).replace(/\/+$/, "");

export const siteMetadata = {
	name: "Erik Gabriel",
	role: "Fullstack & Game Developer",
	title: "Erik Gabriel | Fullstack & Game Developer",
	description:
		"Portfólio de Erik Gabriel — Fullstack e Game Developer. Projetos com React, Next.js, Node.js e Unity, tecnologias que domino e formas de contato.",
	keywords: [
		"Erik Gabriel",
		"Fullstack Developer",
		"Game Developer",
		"Desenvolvedor Fullstack",
		"React",
		"Next.js",
		"Node.js",
		"TypeScript",
		"Unity",
		"Portfólio",
	],
	locale: "pt_BR",
	socialUrls: socialMedias.map((social) => social.url),
} as const;
