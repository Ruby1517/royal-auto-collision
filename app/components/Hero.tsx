import HeroSlider from "@/app/components/HeroSlider";
import { getSiteUrl } from "@/lib/siteUrl";

async function getSlides() {
  const base = getSiteUrl();
  const res = await fetch(`${base}/api/gallery`, { cache: "no-store" });
  if (!res.ok) return [] as Array<{ title: string; beforeImages: string[]; afterImages: string[] }>;
  const items: Array<{
    title?: string;
    beforeMedia?: string[];
    afterMedia?: string[];
    videos?: Array<{ url: string; title?: string }>;
  }> = await res.json();
  const isImageUrl = (u?: string) => !!u && /\.(avif|webp|jpe?g|png|gif)$/i.test((u.split("?")[0]) || u);
  function imageList(arr?: string[]) {
    return (arr || []).filter(isImageUrl).slice(0, 5);
  }
  return items
    .map((it) => {
      const beforeImages = imageList(it.beforeMedia);
      const afterImages = imageList(it.afterMedia);
      return {
        title: it.title || "Recent Work",
        beforeImages,
        afterImages,
      };
    })
    .filter((s) => s.beforeImages.length > 0 && s.afterImages.length > 0);
}

export default async function Hero() {
  const slides = await getSlides();
  const reasons = [
    "Computerized paint matching for seamless color blend",
    "Insurance support with clear milestone updates",
    "Limited lifetime warranty on paint and workmanship",
  ];
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-ink via-slate-900 to-brand-900/40">
      {/* Soft accent glows */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-10 h-80 w-80 rounded-full bg-brand-700/30 blur-3xl" />

      <div className="container-xl relative pt-6 md:pt-8 pb-12 md:pb-14">
        {/* About + reasons */}
        <div className="grid grid-cols-1 md:grid-cols-12 items-start gap-4">
          <div className="md:col-span-8 card p-4 md:p-6 shadow-[0_0_45px_rgba(239,68,68,0.2)]">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-300">Royal Auto Collision</p>
            <h1 className="mt-2 text-xl md:text-2xl font-extrabold leading-tight">
              Professional Collision Repair With Customer-First Service
            </h1>
            <p className="mt-3 max-w-3xl text-xs sm:text-sm text-white/85">
              From minor dents to major collision repairs, our team restores your vehicle with precise workmanship,
              accurate paint matching, and strict quality checks.
            </p>
            <p className="mt-2 max-w-3xl text-xs sm:text-sm text-white/75">
              We coordinate directly with your insurance provider and keep you informed at every step, so the process
              stays simple, transparent, and stress-free.
            </p>
          </div>
          <div className="md:col-span-4 card p-4 md:p-5 shadow-[0_0_45px_rgba(239,68,68,0.2)]">
            <h2 className="text-lg font-bold">Why Customers Choose Us</h2>
            <ul className="mt-3 space-y-2 text-xs sm:text-sm text-white/85">
              {reasons.map((reason) => (
                <li key={reason} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-600/25 text-brand-300">
                    ✓
                  </span>
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Hero slider below the text and buttons */}
        <div className="mt-5 md:mt-6">
          <HeroSlider slides={slides} />
        </div>
      </div>
    </section>
  );
}
