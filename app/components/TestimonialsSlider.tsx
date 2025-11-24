"use client";

import React from "react";
import StarRating from "@/app/components/StarRating";

export type Testimonial = { name: string; text: string; rating?: number };

export default function TestimonialsSlider({ items, intervalMs = 5000 }: { items: Testimonial[]; intervalMs?: number }) {
  const [i, setI] = React.useState(0);
  const [perView, setPerView] = React.useState(1);

  // Responsive items per view: 1 (sm), 2 (md), 3 (lg+)
  React.useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setPerView(w >= 1024 ? 3 : w >= 768 ? 2 : 1);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const pages = React.useMemo(() => {
    const out: Testimonial[][] = [];
    if (items.length === 0) return out;
    for (let idx = 0; idx < items.length; idx += perView) {
      out.push(items.slice(idx, idx + perView));
    }
    return out;
  }, [items, perView]);

  const count = pages.length;
  const timer = React.useRef<number | null>(null);

  React.useEffect(() => {
    if (count <= 1) return;
    timer.current = window.setInterval(() => setI((v) => (v + 1) % count), intervalMs);
    return () => { if (timer.current) window.clearInterval(timer.current); };
  }, [count, intervalMs]);

  if (items.length === 0) return null;

  return (
    <div>
      <div className="relative overflow-hidden rounded-2xl">
        <div className="flex flex-nowrap transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${i * 100}%)` }}>
          {pages.map((page, idx) => (
            <div key={idx} className="basis-full shrink-0 grow-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {page.map((t, j) => (
                  <div key={`${idx}-${j}`} className="card p-6 h-full">
                    {(() => {
                      const r = typeof t.rating === 'number' ? t.rating : 5;
                      return <StarRating value={r} className="mb-2 flex gap-1" ariaLabel={`${r} out of 5 stars`} />;
                    })()}
                    <p className="text-white/90">“{t.text}”</p>
                    <div className="mt-4 font-semibold text-gold">{t.name}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {count > 1 && (
        <div className="mt-4 flex items-center justify-between">
          <div className="flex gap-2">
            <button type="button" className="rounded-full bg-white/10 hover:bg-white/20 px-3 py-1 text-lg" onClick={() => setI((v) => (v - 1 + count) % count)} aria-label="Previous">‹</button>
            <button type="button" className="rounded-full bg-white/10 hover:bg-white/20 px-3 py-1 text-lg" onClick={() => setI((v) => (v + 1) % count)} aria-label="Next">›</button>
          </div>
          <div className="flex gap-2">
            {pages.map((_, idx) => (
              <button key={idx} type="button" aria-label={`Go to slide ${idx + 1}`} onClick={() => setI(idx)} className={`h-2 w-2 rounded-full ${idx === i ? 'bg-white' : 'bg-white/30'}`} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
