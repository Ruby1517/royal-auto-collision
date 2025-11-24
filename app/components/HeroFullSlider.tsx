"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

type Slide = {
  title: string;
  before: string;
  after: string;
};

type Props = {
  slides: Slide[];
  intervalMs?: number;
};

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function HeroFullSlider({ slides, intervalMs = 5000 }: Props) {
  const validSlides = useMemo(
    () => shuffle(slides.filter((s) => !!s.before && !!s.after)),
    [slides]
  );
  const count = validSlides.length;
  const [index, setIndex] = useState(0);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (count <= 1) return;
    timer.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, intervalMs);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [count, intervalMs]);

  if (count === 0) return null;

  const current = validSlides[index];

  return (
    <div className="absolute inset-0">{/* background layer */}
      <div className="grid grid-cols-1 md:grid-cols-2 h-full w-full">
        {/* BEFORE side */}
        <div className="relative h-[50vh] md:h-full">
          <Image
            key={`before-${index}`}
            src={current.before}
            alt={`${current.title} before`}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>
        {/* AFTER side */}
        <div className="relative h-[50vh] md:h-full">
          <Image
            key={`after-${index}`}
            src={current.after}
            alt={`${current.title} after`}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* dark gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/35 to-black/50" />
    </div>
  );
}

