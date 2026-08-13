import type { GlobalConfig } from "payload";

export const About: GlobalConfig = {
	slug: "about",
	label: "Sobre mim",
	admin: {
		group: "Seções",
	},

	fields: [
		{
			name: "image",
			type: "upload",
			label: "Foto",
			relationTo: "media",
			required: true,
			admin: {
				description: "Uma foto de perfil.",
			},
		},
		{
			name: "greeting",
			type: "text",
			label: "Saudação",
			defaultValue: "Olá,",
			required: true,
			admin: {
				placeholder: "Digite sua saudação",
				description: "Saudação de destaque exibida na seção.",
			},
		},
		{
			name: "description",
			type: "textarea",
			label: "Descrição",
			required: true,
			admin: {
				placeholder: "Faça uma breve descrição sobre você",
				description: "Texto principal exibido na seção.",
			},
		},
		{
			name: "techs",
			label: "Tecnologias",
			type: "relationship",
			relationTo: "techs",
			required: true,
			hasMany: true,
			admin: {
				description: "As principais tecnologias que eu trabalho.",
			},
		},
	],
};
