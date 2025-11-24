import Image from "next/image";
import Link from "next/link";

type GalleryItem = {
  _id: string;
  title: string;
  description?: string;
  beforeMedia: string[];
  afterMedia: string[];
  videos?: Array<{ url: string; title?: string }>;
};

async function getGallery(limit = 6): Promise<GalleryItem[]> {
  // same-origin call; no-store so new uploads appear
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? "";
  const res = await fetch(`${base}/api/gallery?limit=${limit}`, {
    cache: "no-store",
  });
  if (!res.ok) return [];
  return res.json();
}

export default async function BeforeAfter() {
  const items = await getGallery(6);
  const isImageUrl = (u?: string) => !!u && /\.(avif|webp|jpe?g|png|gif)$/i.test((u.split("?")[0]) || u);
  const isVideoUrl = (u?: string) => !!u && /\.(mp4|webm|mov|m4v|ogg)$/i.test((u.split("?")[0]) || u);

  return (
    <div>
      <h2 className="text-3xl md:text-4xl font-extrabold mb-8">Before & After</h2>

      {items.length === 0 ? (
        <p className="text-white/70">No entries yet.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((it) => {
            const validBefore = (it.beforeMedia || []).filter(isImageUrl);
            const validAfter = (it.afterMedia || []).filter(isImageUrl);
            const hasPair = validBefore[0] && validAfter[0];
            const poster = validAfter[0] || validBefore[0] || "/og.png";
            const extraVideos = [...(it.beforeMedia || []), ...(it.afterMedia || [])]
              .filter(isVideoUrl)
              .map((url) => ({ url, title: "" }));
            const videos = [...(it.videos || []), ...extraVideos];

            return (
              <div key={it._id} className="card overflow-hidden">
                {hasPair ? (
                  <div className="grid grid-cols-2">
                    <Image src={validBefore[0]} alt={`Before ${it.title}`} width={600} height={400} className="w-full h-48 object-cover"/>
                    <Image src={validAfter[0]}  alt={`After ${it.title}`}  width={600} height={400} className="w-full h-48 object-cover"/>
                  </div>
                ) : videos.length > 0 ? (
                  // eslint-disable-next-line jsx-a11y/media-has-caption
                  <video
                    src={videos[0].url}
                    className="w-full h-48 object-cover"
                    controls
                    preload="metadata"
                    poster={poster}
                  />
                ) : (
                  <Image src={poster} alt={it.title} width={1200} height={800} className="w-full h-48 object-cover"/>
                )}
                <div className="p-4 text-white/90">{it.title}</div>
              </div>
            );
          })}
        </div>
      )}
      <div className="mt-6">
        <Link href="/gallery" className="btn btn-primary">View All Work</Link>
      </div>
    </div>
  );
}
