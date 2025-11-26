import Link from "next/link";
import { getSiteUrl } from "@/lib/siteUrl";

// Fetch all gallery items and flatten their videos
async function getVideos() {
  const base = getSiteUrl();
  const res = await fetch(`${base}/api/gallery`, {
    cache: "no-store",
  });
  if (!res.ok) return [] as Array<{ url: string; title: string; itemTitle: string }>;
  const items: Array<{
    _id: string;
    title: string;
    videos?: Array<{ url: string; title?: string }>;
  }> = await res.json();
  const vids: Array<{ url: string; title: string; itemTitle: string }> = [];
  for (const it of items) {
    (it.videos || []).forEach((v) => {
      vids.push({ url: v.url, title: v.title || "", itemTitle: it.title });
    });
  }
  return vids;
}

export default async function VideoGalleryPage() {
  const videos = await getVideos();

  return (
    <div className="container-xl py-24">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold">Video Gallery</h1>
        <Link href="/gallery" className="btn btn-outline">Image Gallery</Link>
      </div>

      {videos.length === 0 ? (
        <p className="text-white/70">No videos yet. Upload some from the admin dashboard.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((v, i) => (
            <div key={`${v.url}-${i}`} className="card p-4">
              {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
              <video src={v.url} className="w-full rounded-lg" controls preload="metadata" poster="/og.png" />
              <div className="mt-3">
                <div className="font-semibold text-white/90">
                  {v.title || v.itemTitle || "Video"}
                </div>
                {v.title && v.itemTitle && (
                  <div className="text-white/60 text-sm">{v.itemTitle}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export const metadata = {
  title: "Video Gallery - Royal Auto Collision",
  description: "Watch short clips of repairs, paintwork, and shop walk-throughs.",
  alternates: { canonical: "/videos" },
};
