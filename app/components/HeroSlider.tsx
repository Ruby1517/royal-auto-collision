"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

type Slide = {
  title: string;
  beforeImages: string[];
  afterImages: string[];
};

type Props = {
  slides: Slide[];
  intervalMs?: number;
};

export default function HeroSlider({ slides, intervalMs = 5000 }: Props) {
  const validSlides = useMemo(
    () => slides.filter((s) => s.beforeImages.length > 0 && s.afterImages.length > 0),
    [slides]
  );
  const features = ["Free Estimates", "Paint Matching", "Quality Inspection", "Final Detailing"];
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

  const current = validSlides[i];

  function renderImageCollage(images: string[], title: string, label: "BEFORE" | "AFTER", isAfter: boolean, priority: boolean) {
    const primary = images[0];
    const secondary = images[1];
    const tertiary = images[2];
    const hasMany = images.length > 1;

    return (
      <div className="relative h-60 w-full sm:h-72 md:h-[30rem] lg:h-[34rem]">
        {hasMany ? (
          <div className="grid h-full grid-rows-[2.2fr_1fr] gap-2 p-2">
            <div className="relative overflow-hidden rounded-lg border border-white/10">
              <Image
                src={primary}
                alt={`${title} - ${label.toLowerCase()} 1`}
                width={1600}
                height={1000}
                className="h-full w-full object-cover"
                priority={priority}
              />
            </div>
            {images.length > 2 ? (
              <div className="grid grid-cols-2 gap-2">
                <div className="-rotate-[1.1deg] overflow-hidden rounded-md border border-white/10">
                  <Image
                    src={secondary}
                    alt={`${title} - ${label.toLowerCase()} 2`}
                    width={1200}
                    height={800}
                    className="h-full w-full object-cover"
                    priority={priority}
                  />
                </div>
                <div className="rotate-[1.1deg] overflow-hidden rounded-md border border-white/10">
                  <Image
                    src={tertiary}
                    alt={`${title} - ${label.toLowerCase()} 3`}
                    width={1200}
                    height={800}
                    className="h-full w-full object-cover"
                    priority={priority}
                  />
                </div>
              </div>
            ) : (
              <div className="overflow-hidden rounded-md border border-white/10">
                <Image
                  src={secondary}
                  alt={`${title} - ${label.toLowerCase()} 2`}
                  width={1200}
                  height={800}
                  className="h-full w-full object-cover"
                  priority={priority}
                />
              </div>
            )}
          </div>
        ) : (
          <Image
            src={primary}
            alt={`${title} - ${label.toLowerCase()}`}
            width={1600}
            height={1000}
            className="h-full w-full object-cover"
            priority={priority}
          />
        )}
        <span
          className={`absolute top-2 rounded px-2 py-1 text-[10px] font-semibold tracking-wide sm:text-xs ${
            isAfter
              ? "left-2 bg-brand-600/85 text-white"
              : "right-2 bg-black/55 text-white"
          }`}
        >
          {label}
        </span>
        {images.length > 3 && (
          <span className="absolute bottom-2 right-2 rounded bg-black/65 px-2 py-1 text-[10px] text-white sm:text-xs">
            +{images.length - 3} more
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="card relative overflow-hidden p-5 sm:p-7 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
      <div className="pointer-events-none absolute inset-0 opacity-75 [background:radial-gradient(circle_at_10%_8%,rgba(239,68,68,0.2)_0%,rgba(239,68,68,0)_40%),radial-gradient(circle_at_88%_92%,rgba(15,23,42,0.35)_0%,rgba(15,23,42,0)_48%)]" />

      <div className="relative flex flex-wrap items-center justify-center gap-x-4 gap-y-2 border-b border-white/15 pb-4 text-[11px] sm:text-xs text-white/80">
        {features.map((feature) => (
          <span key={feature} className="inline-flex items-center gap-2">
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-sm border border-brand-400/70 bg-brand-600/20">
              <svg viewBox="0 0 16 16" className="h-3 w-3 text-brand-300" aria-hidden="true">
                <path d="M3 8.5l3 3L13 4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            {feature}
          </span>
        ))}
      </div>

      <div className="relative pt-5 text-center">
        {/* <h3 className="text-xl sm:text-3xl font-bold text-white">
          Before - After Repairs That Look Factory-New
        </h3> */}
        <p className="mt-2 text-sm text-white/70">
          Precision body work, paint matching, and finishing you can trust.
        </p>
      </div>

      <div className="relative mt-5 overflow-hidden rounded-xl border border-white/10 bg-black/20">
        <div
          className="flex flex-nowrap will-change-transform transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${i * 100}%)` }}
        >
          {validSlides.map((s, idx) => (
            <div key={idx} className="basis-full shrink-0 grow-0">
              <div className="grid grid-cols-2">
                <div className="relative">
                  {renderImageCollage(s.beforeImages, s.title, "BEFORE", false, idx === i)}
                </div>
                <div className="relative border-l border-white/10">
                  {renderImageCollage(s.afterImages, s.title, "AFTER", true, idx === i)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {count > 1 && (
          <button
            type="button"
            onClick={() => setI((v) => (v + 1) % count)}
            className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/25 bg-ink/70 px-3 py-1 text-sm text-white hover:bg-ink/85"
            aria-label="Next slide"
          >
            &gt;
          </button>
        )}
      </div>

      <div className="relative mt-3 flex items-center justify-between text-[11px] text-white/70 sm:text-xs">
        <p>Tap BEFORE/AFTER - Slides auto-advance</p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setI((v) => (v - 1 + count) % count)}
            className="rounded-full border border-white/20 px-2 py-1 text-white/80 hover:bg-white/10"
            aria-label="Previous slide"
          >
            {"<"}
          </button>
          {validSlides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setI(idx)}
              className={`h-2 w-2 rounded-full ${idx === i ? "bg-white" : "bg-white/35"}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      <p className="mt-2 truncate text-center text-xs text-white/65" title={current.title}>
        {current.title}
      </p>
    </div>
  );
}
