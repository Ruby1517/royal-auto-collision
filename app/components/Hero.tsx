import Link from "next/link";
import HeroSlider from "@/app/components/HeroSlider";
import { getSiteUrl } from "@/lib/siteUrl";

async function getSlides() {
  const base = getSiteUrl();
  const res = await fetch(`${base}/api/gallery`, { cache: "no-store" });
  if (!res.ok) return [] as Array<{ title: string; before?: string; after?: string; video?: string }>;
  const items: Array<{
    title?: string;
    beforeMedia?: string[];
    afterMedia?: string[];
    videos?: Array<{ url: string; title?: string }>;
  }> = await res.json();
  const isImageUrl = (u?: string) => !!u && /\.(avif|webp|jpe?g|png|gif)$/i.test((u.split("?")[0]) || u);
  function firstImage(arr?: string[]) {
    return (arr || []).find(isImageUrl);
  }
  return items
    .map((it) => {
      const before = firstImage(it.beforeMedia);
      const after = firstImage(it.afterMedia);
      return {
        title: it.title || "Recent Work",
        before,
        after,
      };
    })
    .filter((s) => !!s.before && !!s.after);
}

export default async function Hero() {
  const slides = await getSlides();
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-ink via-slate-900 to-brand-900/40">
      {/* Soft accent glows */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-10 h-80 w-80 rounded-full bg-brand-700/30 blur-3xl" />

      <div className="container-xl relative pt-10 md:pt-12 pb-24">
        {/* About + reasons */}
        <div className="grid grid-cols-1 md:grid-cols-12 items-start gap-6">
          <div className="md:col-span-8 card p-6 md:p-8 shadow-[0_0_45px_rgba(239,68,68,0.25)]">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-4">Royal Auto Collision</h1>
            <p className="text-white/90 max-w-2xl">
              Your trusted collision center in Fresno, CA. We bring vehicles back to pre-accident condition with
              OEM-approved repair methods, advanced frame measuring systems, and digitally matched paint finishes.
            </p>
            <p className="text-white/85 mt-4 max-w-2xl">
              We handle the insurance process for you, provide clear communication from start to finish,
              and guarantee our paint work for the life of your vehicle ownership.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link href="/about" className="btn btn-outline">Read Our Story</Link>
              <Link href="/gallery" className="btn btn-outline">View Our Work</Link>
              <Link href="/estimate" className="btn btn-primary">Get a Free Estimate</Link>
            </div>
          </div>
          <div className="md:col-span-4">
            <div className="card p-6 shadow-[0_0_45px_rgba(239,68,68,0.25)]">
              <h2 className="text-xl font-semibold mb-3">Why Drivers Choose Us</h2>
              <ul className="space-y-2 text-white/85">
                <li>- OEM repair methods and parts guidance</li>
                <li>- Computer color-matched refinishing</li>
                <li>- Insurance coordination and status updates</li>
                <li>- Lifetime paint warranty</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Hero slider below the text and buttons */}
        <div className="mt-10">
          <HeroSlider slides={slides} />
        </div>
      </div>
    </section>
  );
}
