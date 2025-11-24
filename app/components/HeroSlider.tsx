"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

type Slide = {
  title: string;
  before?: string;
  after?: string;
};

type Props = {
  slides: Slide[];
  intervalMs?: number;
};

export default function HeroSlider({ slides, intervalMs = 5000 }: Props) {
  // Only allow pairs (both before+after)
  const validSlides = useMemo(() => slides.filter((s) => s.before && s.after), [slides]);
  const [i, setI] = useState(0);
  const timer = useRef<number | null>(null);
  const count = validSlides.length;

  useEffect(() => {
    if (count <= 1) return; // no autoplay if 0/1 slides
    timer.current = window.setInterval(() => {
      setI((v) => (v + 1) % count);
    }, intervalMs);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [count, intervalMs]);

  if (count === 0) return null;

  return (
    <div className="mt-14">
      <div className="flex items-center justify-between mb-4">
        <div className="text-white/80 text-sm">Recent Work</div>
        {count > 1 && (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setI((v) => (v - 1 + count) % count)}
              className="rounded-full bg-white/10 hover:bg-white/20 px-3 py-1 text-lg"
              aria-label="Previous"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => setI((v) => (v + 1) % count)}
              className="rounded-full bg-white/10 hover:bg-white/20 px-3 py-1 text-lg"
              aria-label="Next"
            >
              ›
            </button>
          </div>
        )}
      </div>

      {/* Slider viewport */}
      <div className="relative overflow-hidden rounded-2xl">
        {/* Track */}
        <div
          className="flex flex-nowrap will-change-transform transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${i * 100}%)` }}
        >
          {validSlides.map((s, idx) => (
            <div key={idx} className="basis-full shrink-0 grow-0">
              {s.before && s.after ? (
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="card overflow-hidden">
                    <Image
                      src={s.before}
                      alt={`${s.title} - before`}
                      width={1600}
                      height={1000}
                      className="w-full h-[22rem] md:h-[26rem] lg:h-[30rem] object-cover"
                      priority={idx === i}
                    />
                    <div className="p-4">
                      <div className="font-semibold">Before</div>
                      <p className="text-white/80 truncate" title={s.title}>{s.title}</p>
                    </div>
                  </div>
                  <div className="card overflow-hidden">
                    <Image
                      src={s.after}
                      alt={`${s.title} - after`}
                      width={1600}
                      height={1000}
                      className="w-full h-[22rem] md:h-[26rem] lg:h-[30rem] object-cover"
                      priority={idx === i}
                    />
                    <div className="p-4">
                      <div className="font-semibold">After</div>
                      <p className="text-white/80 truncate" title={s.title}>{s.title}</p>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      {count > 1 && (
        <div className="mt-4 flex gap-2">
          {validSlides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setI(idx)}
              className={`h-2 w-2 rounded-full ${idx === i ? "bg-white" : "bg-white/30"}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
