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

	element?.scrollIntoView({
		behavior: "smooth",
		block: "start",
	});
};
