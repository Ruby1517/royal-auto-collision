import Link from "next/link";
import GalleryTabs from "@/app/components/GalleryTabs";
import { getSiteUrl } from "@/lib/siteUrl";

const siteUrl = getSiteUrl();

// server component: fetch data on the server
async function getItems() {
  // Same-origin API call; no caching so new uploads appear
  const base = getSiteUrl();
  const res = await fetch(`${base}/api/gallery`, {
    cache: "no-store",
  });
  if (!res.ok) return [];
  try { return await res.json(); } catch { return []; }
}

export default async function GalleryPage() {
  const items: Array<{
    _id: string;
    title: string;
    description?: string;
    beforeMedia: string[];
    afterMedia: string[];
    videos?: Array<{ url: string; title?: string }>;
  }> = await getItems();

  const totalPhotos = items.reduce(
    (sum, it) => sum + (it.beforeMedia?.length || 0) + (it.afterMedia?.length || 0),
    0
  );
  const totalVideos = items.reduce(
    (sum, it) => sum + (it.videos?.length || 0),
    0
  );
  const hasItems = items.length > 0;

  const highlights = [
    {
      title: "Insurance-friendly documentation",
      body: "Clear before/after sets with dates so claims adjusters see the full story.",
    },
    {
      title: "OEM-grade paint match",
      body: "We blend panels and clearcoat for a finish that looks factory fresh.",
    },
    {
      title: "Repair status updates",
      body: "We keep you posted from teardown to delivery so there are no surprises.",
    },
  ];

  return (
    <div className="container-xl py-20 space-y-12">
      <script
        id="ld-gallery-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
              { "@type": "ListItem", position: 2, name: "Before & After Gallery", item: `${siteUrl}/gallery` }
            ]
          })
        }}
      />
      <script
        id="ld-gallery-collection"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Before & After Gallery",
            url: `${siteUrl}/gallery`,
            about: "Collision repair before-and-after photos and videos from Royal Auto Collision in Fresno, CA.",
            numberOfItems: items.length,
            hasPart: items.map((it) => ({
              "@type": "CreativeWork",
              name: it.title,
              url: `${siteUrl}/gallery`,
            })),
          })
        }}
      />
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-ink via-slate-900 to-brand-900/40 px-8 py-12 md:px-12 md:py-16">
        <div className="absolute inset-0 opacity-50 bg-[radial-gradient(circle_at_20%_20%,rgba(239,68,68,0.25),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.08),transparent_35%)]" aria-hidden />

        <div className="relative grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/60">Before & After</p>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">See the Royal finish on real customer repairs.</h1>
            <p className="text-lg text-white/75 max-w-2xl">
              Every vehicle that leaves our shop is photographed so you can see exactly how we restore panels, match
              paint, and deliver a factory-level result.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link href="/estimate" className="btn btn-primary">Start a free estimate</Link>
              <a href="tel:+15592864750" className="btn btn-outline">Call (559) 286-4750</a>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              {[{ label: "Documented repairs", value: `${items.length || 0}` }, { label: "Photo angles", value: `${totalPhotos || 0}` }, { label: "Customer videos", value: `${totalVideos || 0}` }].map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <div className="text-2xl font-bold text-white">{stat.value}+</div>
                  <div className="text-sm text-white/70">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-6 space-y-4 shadow-glow">
            <div className="text-sm uppercase text-white/60">What to expect</div>
            <div className="space-y-3 text-white/80">
              <div className="flex gap-3">
                <div className="mt-1 h-2 w-2 rounded-full bg-brand-500" aria-hidden />
                <div>
                  <div className="font-semibold">Intake & estimate</div>
                  <p className="text-sm text-white/65">We document damage and submit photos with your claim.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="mt-1 h-2 w-2 rounded-full bg-brand-500" aria-hidden />
                <div>
                  <div className="font-semibold">Repair & refinish</div>
                  <p className="text-sm text-white/65">Panels repaired, paint matched, and cured in our booth.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="mt-1 h-2 w-2 rounded-full bg-brand-500" aria-hidden />
                <div>
                  <div className="font-semibold">Quality check</div>
                  <p className="text-sm text-white/65">Before/after images captured so you can review the finish.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative mt-10 grid gap-4 lg:grid-cols-3 text-white/90">
          {highlights.map((item) => (
            <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <div className="font-semibold mb-1">{item.title}</div>
              <p className="text-sm text-white/70 leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-white/60">Gallery</p>
            <h2 className="text-3xl md:text-4xl font-extrabold">Before & after library</h2>
            <p className="text-white/75 max-w-3xl">Browse completed repairs from Fresno drivers - no stock photos. Tap any set to view the full sequence.</p>
          </div>
          <div className="flex flex-wrap gap-2 text-sm">
            <span className="rounded-full border border-white/15 px-3 py-1 text-white/75">{items.length} repair stories</span>
            <span className="rounded-full border border-white/15 px-3 py-1 text-white/75">{totalPhotos} photos</span>
            <span className="rounded-full border border-white/15 px-3 py-1 text-white/75">{totalVideos} videos</span>
          </div>
        </div>

        {hasItems ? (
          <GalleryTabs items={items} />
        ) : (
          <div className="card p-8">
            <div className="text-2xl font-semibold mb-3">Uploads coming soon</div>
            <p className="text-white/70 mb-4">We&apos;re adding fresh before-and-after sets from recent customers. Want your vehicle featured? Start an estimate and we&apos;ll document every step.</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/estimate" className="btn btn-primary">Start a free estimate</Link>
              <a href="tel:+15592864750" className="btn btn-outline">Call the shop</a>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export const metadata = {
  title: "Before & After - Royal Auto Collision",
  description: "See our collision repair results: before-and-after photos of real work.",
  keywords: [
    "collision repair before and after",
    "auto body shop gallery",
    "paint match examples",
    "Fresno collision repair photos",
    "car bodywork results"
  ],
  openGraph: {
    title: "Collision Repair Before & After Gallery | Royal Auto Collision",
    description: "Real customer repairs with before-and-after photos and videos from our Fresno collision center.",
    url: "/gallery",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Royal Auto Collision Gallery" }],
  },
  alternates: { canonical: "/gallery" },
};
