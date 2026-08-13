import path from "node:path";
import type { CollectionBeforeOperationHook } from "payload";
import sharp from "sharp";

export const processMedia: CollectionBeforeOperationHook = async ({
	operation,
	req,
}) => {
	if ((operation !== "create" && operation !== "update") || !req.file) {
		return;
	}

	const file = req.file;

	// SVG não deve ser convertido.
	if (file.mimetype === "image/svg+xml") {
		return;
	}

	// Só processa imagens rasterizadas.
	if (!file.mimetype.startsWith("image/")) {
		return;
	}

	const buffer = await sharp(file.data)
		.resize({
			width: 2560,
			withoutEnlargement: true,
		})
		.webp({
			quality: 80,
		})
		.toBuffer();

	const originalName = path.parse(file.name).name;

	file.data = buffer;
	file.name = `${originalName}.webp`;
	file.mimetype = "image/webp";
	file.size = buffer.length;
};
