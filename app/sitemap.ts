import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/services",
    "/testimonials",
    "/estimate",
    "/map",
    "/gallery",
    "/videos",
    "/cars",
  ];

  const now = new Date();
  return routes.map((path) => ({
    url: new URL(path, BASE_URL).toString(),
    lastModified: now,
    changeFrequency: "monthly",
    priority: path === "" ? 1.0 : 0.7,
  }));
}
