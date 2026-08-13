import type { CollectionConfig } from "payload";

import { anyone } from "../access/anyone";
import { authenticated } from "../access/authenticated";

export const Techs: CollectionConfig = {
	slug: "techs",
	orderable: true,
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

	hooks: {
		afterChange: [
			async ({ doc, req }) => {
				// Procura a Tag vinculada a esta Tech
				const existingTag = await req.payload.find({
					collection: "tags",
					where: {
						tech: {
							equals: doc.id,
						},
					},
					limit: 1,
					depth: 0,
				});

				// A Tech já possui uma Tag vinculada
				if (existingTag.docs.length > 0) {
					const tag = existingTag.docs[0];

					// Só atualiza se realmente precisar
					if (tag.title !== doc.name) {
						await req.payload.update({
							collection: "tags",
							id: tag.id,
							data: {
								title: doc.name,
							},
						});
					}

					return;
				}

				// A Tech ainda não possui uma Tag
				await req.payload.create({
					collection: "tags",
					data: {
						title: doc.name,
						tech: doc.id,
					},
				});
			},
		],

		afterDelete: [
			async ({ id, req }) => {
				const existingTag = await req.payload.find({
					collection: "tags",
					where: {
						tech: {
							equals: id,
						},
					},
					limit: 1,
					depth: 0,
				});

				if (existingTag.docs.length === 0) {
					return;
				}

				await req.payload.delete({
					collection: "tags",
					id: existingTag.docs[0].id,
				});
			},
		],
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
			name: "icon",
			label: "Ícone",
			type: "text",
			required: true,
			admin: {
				placeholder: "Ex: simple-icons:react",
				description:
					"Nome do ícone da tecnologia. O nome deve ser o mesmo do ícone disponível no Iconify",
			},
		},
	],
};
