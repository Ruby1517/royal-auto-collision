import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/siteUrl";

const BASE_URL = getSiteUrl();

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
