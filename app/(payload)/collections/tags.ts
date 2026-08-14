import type { CollectionConfig } from "payload";
import { Forbidden } from "payload";
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
		update: authenticated,
		delete: authenticated,
	},
	hooks: {
		beforeChange: [
			async ({ originalDoc, req, context }) => {
				if (context.skipTechTagSync) {
					return;
				}

				if (originalDoc?.tech) {
					throw new Forbidden(req.t);
				}
			},
		],
		beforeDelete: [
			async ({ id, req, context }) => {
				if (context.skipTechTagSync) {
					return;
				}
				const tag = await req.payload.findByID({
					collection: "tags",
					id,
					depth: 0,
					req,
				});

				if (tag?.tech) {
					throw new Forbidden(req.t);
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
