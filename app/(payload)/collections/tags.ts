import type { CollectionConfig } from "payload";

import { anyone } from "../access/anyone";
import { authenticated } from "../access/authenticated";

export const Tags: CollectionConfig = {
	slug: "tags",
	labels: {
		singular: "Tag",
		plural: "Tags",
	},
	admin: {
		useAsTitle: "title",
		group: "Conteúdos",
		defaultColumns: ["title", "tech"],
	},
	access: {
		create: authenticated,
		read: anyone,
		update: async ({ id, req }) => {
			if (!id) {
				return authenticated({ req });
			}

			const tag = await req.payload.findByID({
				collection: "tags",
				id,
				depth: 0,
			});

			if (tag.tech) {
				return false;
			}

			return authenticated({ req });
		},
		delete: async ({ id, req }) => {
			if (!id) {
				return authenticated({ req });
			}

			const tag = await req.payload.findByID({
				collection: "tags",
				id,
				depth: 0,
			});

			if (tag.tech) {
				return false;
			}

			return authenticated({ req });
		},
	},

	hooks: {
		beforeDelete: [
			async ({ id, req }) => {
				const tag = await req.payload.findByID({
					collection: "tags",
					id,
					depth: 0,
				});

				if (tag.tech) {
					throw new Error(
						"Tags vinculadas a tecnologias não podem ser excluídas diretamente.",
					);
				}
			},
		],
	},
	fields: [
		{
			name: "title",
			label: "Título",
			type: "text",
			required: true,
			unique: true,
			admin: {
				placeholder: "Nome da tag",
			},
		},
		{
			name: "tech",
			label: "Tecnologia",
			type: "relationship",
			relationTo: "techs",
			unique: true,
			admin: {
				readOnly: true,
				description:
					"Tags vinculadas a tecnologias são gerenciadas automaticamente.",
			},
		},
	],
};
