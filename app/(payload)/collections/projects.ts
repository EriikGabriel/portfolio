import type { CollectionConfig } from "payload";
import { anyone } from "../access/anyone";
import { authenticated } from "../access/authenticated";

export const Projects: CollectionConfig = {
	slug: "projects",
	orderable: true,
	labels: {
		singular: "Projeto",
		plural: "Projetos",
	},
	admin: {
		useAsTitle: "title",
		group: "Conteúdos",
	},
	access: {
		create: authenticated,
		read: anyone,
		update: authenticated,
		delete: authenticated,
	},
	fields: [
		{
			name: "title",
			label: "Título",
			type: "text",
			required: true,
			unique: true,
			admin: {
				placeholder: "Título do projeto",
			},
		},
		{
			name: "description",
			label: "Descrição",
			type: "textarea",
			required: true,
			admin: {
				placeholder: "Descrição do projeto",
			},
		},
		{
			name: "featured",
			label: "Destaque",
			type: "checkbox",
			required: true,
			admin: {
				description: "Marque se o projeto deve ser exibido como destaque.",
			},
		},
		{
			name: "tags",
			label: "Tags",
			type: "relationship",
			required: true,
			hasMany: true,
			relationTo: "tags",
			admin: {
				description: "Tags associadas ao projeto.",
			},
		},
		{
			name: "image",
			label: "Cover",
			type: "upload",
			relationTo: "media",
			required: false,
			admin: {
				description:
					"Imagem cover do projeto. Recomenda-se uma imagem com proporção 16:9.",
			},
		},
		{
			name: "github",
			label: "GitHub",
			type: "text",
			required: true,
			admin: {
				placeholder: "https://...",
				description: "Link para o repositório do projeto no GitHub.",
			},
		},
		{
			name: "demo",
			label: "Demo",
			type: "text",
			required: false,
			admin: {
				placeholder: "https://...",
				description: "Link para a demonstração do projeto.",
			},
		},
		{
			name: "enabled",
			label: "Exibir",
			type: "checkbox",
			defaultValue: true,
			admin: {
				position: "sidebar",
			},
		},
	],
};
