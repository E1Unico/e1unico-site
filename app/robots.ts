import type { MetadataRoute } from "next";

const BASE_URL = "https://e1unico.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/order/success"],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
