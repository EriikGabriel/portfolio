type SocialMedia = {
	name: string;
	icon: string;
	url: string;
	desc: string;
	imageSrc?: string;
};

export const socialMedias: SocialMedia[] = [
	{
		name: "GitHub",
		icon: "fa7-brands:github",
		url: "https://github.com/EriikGabriel",
		desc: "EriikGabriel",
	},
	{
		name: "Instagram",
		icon: "fa7-brands:instagram",
		url: "https://www.instagram.com/eriikgaabriel/",
		desc: "@eriikgaabriel",
		imageSrc: "/assets/instagram-mock.png",
	},
	{
		name: "X",
		icon: "fa7-brands:x-twitter",
		url: "https://www.x.com/canopuskire/",
		desc: "@canopuskire",
	},
	{
		name: "LinkedIn",
		icon: "fa7-brands:linkedin",
		url: "https://www.linkedin.com/in/erikgabrielsilva/",
		desc: "erikgabrielsilva",
		imageSrc: "/assets/linkedin-mock.png",
	},
];
