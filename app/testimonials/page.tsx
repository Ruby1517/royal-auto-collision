import FeedbackForm from "@/app/components/FeedbackForm";
import StarRating from "@/app/components/StarRating";
import TestimonialsSlider from "@/app/components/TestimonialsSlider";

type Testimonial = { _id: string; name: string; text: string; rating?: number };

export const metadata = {
  title: "Testimonials | Twin Auto Sale",
  description: "Read real customer reviews about our collision repair quality and service.",
  alternates: { canonical: "/testimonials" },
};

async function getTestimonials(): Promise<Testimonial[]> {
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? "";
  const res = await fetch(`${base}/api/testimonials`, { cache: "no-store" });
  if (!res.ok) return [];
  return res.json() as Promise<Testimonial[]>;
}

export default async function TestimonialsPage() {
  const items = await getTestimonials();
  const ratings = items
    .map((t: Testimonial) => (typeof t.rating === "number" ? t.rating : 5))
    .filter((n): n is number => Number.isFinite(n));
  const count = ratings.length;
  const avg = count ? ratings.reduce((a, b) => a + b, 0) / count : 0;
  const rounded = Math.round(avg * 2) / 2; // nearest half for display

  return (
    <div className="container-xl py-24">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-10">What Customers Say</h1>
      {count > 0 && (
        <div className="mb-8 flex items-center gap-3">
          <StarRating value={rounded} className="flex gap-1" size={22} ariaLabel={`${rounded} out of 5 stars`} />
          <div className="text-white/80 text-sm">
            {avg.toFixed(1)} / 5 | {count} {count === 1 ? "review" : "reviews"}
          </div>
        </div>
      )}
      {items.length === 0 ? (
        <p className="text-white/70 mb-8">No reviews yet. Be the first to share your experience.</p>
      ) : (
        <div className="mb-10">
          <TestimonialsSlider items={items} />
        </div>
      )}
      <FeedbackForm />
    </div>
  );
}
