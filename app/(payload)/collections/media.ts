import { revalidatePath } from "next/cache";
import type { CollectionConfig } from "payload";

import { anyone } from "../access/anyone";
import { authenticated } from "../access/authenticated";

export const Media: CollectionConfig = {
	slug: "media",
	labels: {
		singular: "Mídia",
		plural: "Mídias",
	},
	admin: {
		useAsTitle: "filename",
		group: "Uploads",
	},
	upload: {
		mimeTypes: ["image/png", "image/jpeg", "image/webp"],
		resizeOptions: {
			width: 2560,
			withoutEnlargement: true,
		},
	},
	access: {
		create: authenticated,
		read: anyone,
		update: authenticated,
		delete: authenticated,
	},
	hooks: {
		afterChange: [
			({ doc }) => {
				revalidatePath("/");
				return doc;
			},
		],
		afterDelete: [
			({ doc }) => {
				revalidatePath("/");
				return doc;
			},
		],
	},
	fields: [
		{
			name: "alt",
			type: "text",
			required: true,

			admin: {
				description:
					"Descrição da imagem para acessibilidade (leitores de tela) e otimização em buscadores (SEO).",
				placeholder: "Descrição da imagem",
			},
		},
	],
};
