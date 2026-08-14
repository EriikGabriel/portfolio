import { vercelPostgresAdapter } from "@payloadcms/db-vercel-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { en } from "@payloadcms/translations/languages/en";
import { pt } from "@payloadcms/translations/languages/pt";
import path from "path";
import { buildConfig } from "payload";
import sharp from "sharp";
import { fileURLToPath } from "url";
import { Media, Projects, Tags, Techs, Users } from "./collections";
import { About } from "./globals";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const isVercelDeployment = process.env.VERCEL === "1";

const requiredEnv = (name: string): string => {
	const value = process.env[name];

	if (!value) {
		throw new Error(
			`[payload.config] Missing required environment variable: ${name}`,
		);
	}

	return value;
};

const serverURL =
	process.env.NODE_ENV === "production"
		? requiredEnv("NEXT_PUBLIC_SERVER_URL")
		: process.env.NEXT_PUBLIC_SERVER_URL;
const payloadSecret = requiredEnv("PAYLOAD_SECRET");
const databaseUrl = requiredEnv("DATABASE_URL");
const blobToken =
	process.env.NODE_ENV === "production"
		? requiredEnv("BLOB_READ_WRITE_TOKEN")
		: process.env.BLOB_READ_WRITE_TOKEN;

if (isVercelDeployment && !blobToken) {
	throw new Error(
		"[payload.config] Missing BLOB_READ_WRITE_TOKEN in production. Connect Vercel Blob to the project or add the token in Vercel Environment Variables.",
	);
}

export default buildConfig({
	serverURL: serverURL || "http://localhost:3000",
	i18n: {
		supportedLanguages: { pt, en },
		fallbackLanguage: "pt",
	},
	admin: {
		theme: "dark",
		user: Users.slug,
		importMap: {
			baseDir: path.resolve(dirname),
		},
	},
	editor: lexicalEditor(),
	collections: [Users, Media, Techs, Projects, Tags],
	globals: [About],
	secret: payloadSecret,
	typescript: {
		outputFile: path.resolve(dirname, "payload-types.ts"),
	},
	db: vercelPostgresAdapter({
		pool: {
			connectionString: databaseUrl,
		},
		migrationDir: path.resolve(dirname, "migrations"),
	}),

	sharp,
	plugins: [
		...(blobToken
			? [
					vercelBlobStorage({
						enabled: true,
						collections: {
							media: true,
						},
						token: blobToken,
					}),
				]
			: []),
	],
});
