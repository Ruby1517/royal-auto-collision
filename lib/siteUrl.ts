export function getSiteUrl(): string {
  const envUrl = (process.env.NEXT_PUBLIC_BASE_URL || "").trim();
  if (envUrl) {
    return envUrl.replace(/\/+$/, "");
  }
  const vercel = (process.env.VERCEL_URL || "").trim();
  if (vercel) {
    const normalized = vercel.startsWith("http") ? vercel : `https://${vercel}`;
    return normalized.replace(/\/+$/, "");
  }
  return "http://localhost:3000";
}
