"use client";

import Image from "next/image";
import { useState } from "react";

export default function CarGallery({ photos, name }: { photos: string[]; name: string }) {
  const safePhotos = Array.isArray(photos) ? photos.filter(Boolean) : [];
  const [active, setActive] = useState(0);

  if (safePhotos.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-black/40 p-4 text-white/70">
        No photos available yet.
      </div>
    );
  }

  const main = safePhotos[Math.min(active, safePhotos.length - 1)];

  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40">
        {safePhotos.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => setActive((prev) => (prev - 1 + safePhotos.length) % safePhotos.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-white border border-white/20 hover:bg-black/85"
              aria-label="Previous photo"
            >
              {"<"}
            </button>
            <button
              type="button"
              onClick={() => setActive((prev) => (prev + 1) % safePhotos.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-white border border-white/20 hover:bg-black/85"
              aria-label="Next photo"
            >
              {">"}
            </button>
          </>
        )}
        <Image
          src={main}
          alt={name}
          width={1600}
          height={900}
          className="w-full h-[420px] md:h-[520px] object-cover"
          priority
        />
      </div>
      {safePhotos.length > 1 ? (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {safePhotos.map((photo, idx) => (
            <button
              key={photo}
              type="button"
              onClick={() => setActive(idx)}
              className={`relative h-24 w-32 shrink-0 overflow-hidden rounded-xl border transition ${
                idx === active ? "border-brand-400 shadow-glow" : "border-white/15 hover:border-white/40"
              }`}
            >
              <Image
                src={photo}
                alt={`${name} thumbnail ${idx + 1}`}
                width={320}
                height={240}
                className="h-full w-full object-cover"
              />
              {idx === active ? (
                <span className="absolute inset-0 ring-2 ring-brand-400/70 rounded-xl pointer-events-none" aria-hidden />
              ) : null}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
