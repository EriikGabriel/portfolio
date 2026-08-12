const { withPayload } = require("@payloadcms/next/withPayload");
/** @type {import('next').NextConfig} */
const nextConfig = {
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
