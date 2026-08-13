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
		],
	},
};

module.exports = withPayload(nextConfig);
