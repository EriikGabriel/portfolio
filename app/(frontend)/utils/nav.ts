import { lenisRef } from "@utils/lenis";

export const navItems = [
	{
		label: "Quem sou",
		id: "about",
	},
	{
		label: "Skills",
		id: "skills",
	},
	{
		label: "Projetos",
		id: "projects",
	},
	{
		label: "Conecte-se",
		id: "connect",
	},
];

export const scrollToSection = (id: string) => {
	const element = document.getElementById(id);
	if (!element) return;

	const lenis = lenisRef.current;
	if (lenis) {
		lenis.scrollTo(element, { duration: 1.2 });
		return;
	}

	const prefersReducedMotion = window.matchMedia(
		"(prefers-reduced-motion: reduce)",
	).matches;

	element.scrollIntoView({
		behavior: prefersReducedMotion ? "auto" : "smooth",
		block: "start",
	});
};
