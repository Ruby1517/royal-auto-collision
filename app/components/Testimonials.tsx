import Link from "next/link";
import TestimonialsSlider from "@/app/components/TestimonialsSlider";
import StarRating from "@/app/components/StarRating";

async function getTestimonials() {
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? "";
  try {
    const res = await fetch(`${base}/api/testimonials`, { cache: "no-store" });
    if (!res.ok) return [] as Array<{ name: string; text: string; rating?: number }>;
    const items: Array<{ name: string; text: string; rating?: number }> = await res.json();
    return items;
  } catch {
    return [] as Array<{ name: string; text: string; rating?: number }>;
  }
}

export default async function Testimonials(){
  const items = await getTestimonials();
  const ratings = items
    .map((t) => (typeof t.rating === 'number' ? t.rating : null))
    .filter((n): n is number => Number.isFinite(n));
  const count = ratings.length;
  const avg = count ? ratings.reduce((a, b) => a + b, 0) / count : 0;
  const rounded = Math.round(avg * 2) / 2; // nearest half
  return (
    <div>
      <h2 className="text-3xl md:text-4xl font-extrabold mb-8">What Customers Say</h2>
      {count > 0 && (
        <div className="mb-6 flex items-center gap-3">
          <StarRating value={rounded} className="flex gap-1" ariaLabel={`${rounded} out of 5 stars`} />
          <div className="text-white/80 text-sm">{avg.toFixed(1)} / 5 • {count} {count === 1 ? 'review' : 'reviews'}</div>
        </div>
      )}
      {items.length === 0 ? (
        <p className="text-white/70">No reviews yet. Be the first to share your experience.</p>
      ) : (
        <TestimonialsSlider items={items} />
      )}
      <div className="mt-6">
        <Link href="/testimonials#feedback" className="btn btn-primary">Share Your Feedback</Link>
      </div>
    </div>
  );
}
