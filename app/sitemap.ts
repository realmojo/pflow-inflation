import type { MetadataRoute } from "next";
import { INFLATION_ITEMS, CATEGORY_LIST } from "@/lib/inflation-items";
import { toSlug } from "@/lib/slug";

const SITE_URL = "https://inflation.pflow.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const itemRoutes = INFLATION_ITEMS.map((item) => ({
    url: `${SITE_URL}/${toSlug(item.category)}/${toSlug(item.name)}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const categoryRoutes = CATEGORY_LIST.map((cat) => ({
    url: `${SITE_URL}/${toSlug(cat)}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/statistics`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/regional`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    ...categoryRoutes,
    ...itemRoutes,
  ];
}
