import { siteUrl } from "@utils/site";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: "*",
			allow: "/",
			disallow: ["/admin", "/api"],
		},
		sitemap: `${siteUrl}/sitemap.xml`,
	};
}
