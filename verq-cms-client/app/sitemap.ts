import type { MetadataRoute } from "next";
import { fetchWorkList, workSlug } from "@/service/fetchWorkList";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: "https://verq.co",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://verq.co/works",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://verq.co/about",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const data = await fetchWorkList();
  const workRoutes: MetadataRoute.Sitemap = data
    ? data.Works.map((w) => ({
        url: `https://verq.co/works/${workSlug(w.Title)}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      }))
    : [];

  return [...staticRoutes, ...workRoutes];
}
