import type { MetadataRoute } from "next";

const BASE_URL = "https://e1unico.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "/", priority: 1, changeFrequency: "weekly" as const },
    { path: "/unicojam", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/manuel", priority: 0.5, changeFrequency: "monthly" as const },
    { path: "/trust", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/order/2k-special", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/order/custom-unicoos", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/order/unicocare", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/legal/privacy", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/legal/terms", priority: 0.3, changeFrequency: "yearly" as const },
  ];

  return routes.map((r) => ({
    url: `${BASE_URL}${r.path}`,
    lastModified: new Date(),
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
