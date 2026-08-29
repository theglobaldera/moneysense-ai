import type { MetadataRoute } from "next";
import { scenarios } from "@/lib/content/scenarios";
import { topics } from "@/lib/content/topics";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const staticRoutes = ["", "/ask", "/scenarios", "/simulate", "/learn", "/progress", "/about"];

  return [
    ...staticRoutes.map((route) => ({ url: `${base}${route}` })),
    ...scenarios.map((s) => ({ url: `${base}/scenarios/${s.slug}` })),
    ...topics.map((t) => ({ url: `${base}/learn/${t.slug}` })),
  ];
}
