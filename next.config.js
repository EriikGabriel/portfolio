/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ["api.microlink.io"],
		remotePatterns: [
			{
				protocol: "https",
				hostname: "github.com",
				pathname: "**",
			},
		],
	},
};

module.exports = nextConfig;
