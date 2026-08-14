import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "github.com",
				pathname: "**",
			},
			{
				protocol: "https",
				hostname: "api.microlink.io",
			},
			{
				protocol: "http",
				hostname: "localhost",
				port: "3000",
				pathname: "/media/**",
			},
			{
				protocol: "https",
				hostname: "*.public.blob.vercel-storage.com",
			},
		],
	},
};

module.exports = withPayload(nextConfig);
