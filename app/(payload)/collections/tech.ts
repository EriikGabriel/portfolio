import type { CollectionConfig } from "payload";
import { anyone } from "../access/anyone";
import { authenticated } from "../access/authenticated";

export const Techs: CollectionConfig = {
	slug: "techs",
	labels: {
		singular: "Tecnologia",
		plural: "Tecnologias",
	},
	admin: {
		useAsTitle: "name",
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
			name: "name",
			label: "Nome",
			type: "text",
			required: true,
			unique: true,
			admin: {
				placeholder: "Nome da tecnologia",
			},
		},
		{
			name: "url",
			type: "text",
			label: "URL",
			required: true,
			admin: {
				placeholder: "URL da tecnologia",
			},
		},
		{
			name: "type",
			label: "Tipo",
			type: "select",
			options: [
				{
					label: "Ícone",
					value: "icon",
				},
				{
					label: "Imagem",
					value: "image",
				},
			],
			required: true,
		},

		{
			name: "icon",
			label: "Ícone",
			type: "text",
			required: true,
			admin: {
				placeholder: "Ex: simple-icons:react",
				description:
					"Nome do ícone da tecnologia. O nome deve ser o mesmo do ícone disponível em Iconify",
				condition: (_, siblingData) => siblingData?.type === "icon",
			},
		},

		{
			name: "image",
			label: "Imagem",
			type: "upload",
			relationTo: "media",
			required: true,
			filterOptions: {
				mimeType: { equals: "image/svg+xml" },
			},
			admin: {
				description: "Imagem representando o ícone da tecnologia.",
				condition: (_, siblingData) => siblingData?.type === "image",
			},
		},
	],
};
