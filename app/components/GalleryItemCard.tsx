"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";

type Props = {
  title: string;
  before?: string[];
  after?: string[];
  videos?: Array<{ url: string; title?: string }>;
};

export default function GalleryItemCard({ title, before = [], after = [], videos = [] }: Props) {
  const isImageUrl = (u?: string) => !!u && /\.(avif|webp|jpe?g|png|gif)$/i.test(u.split("?")[0]);
  const isVideoUrl = (u?: string) => !!u && /\.(mp4|webm|mov|m4v|ogg)$/i.test(u.split("?")[0]);

  const validBefore = useMemo(() => before.filter(isImageUrl), [before]);
  const validAfter = useMemo(() => after.filter(isImageUrl), [after]);
  const all = useMemo(() => [...validBefore, ...validAfter], [validBefore, validAfter]);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const openAt = useCallback((i: number) => {
    setIndex(i);
    setLightboxOpen(true);
    setExpanded(false);
  }, []);

  const close = useCallback(() => {
    setLightboxOpen(false);
    setExpanded(false);
  }, []);
  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + all.length) % all.length);
  }, [all.length]);
  const next = useCallback(() => {
    setIndex((i) => (i + 1) % all.length);
  }, [all.length]);

  useEffect(() => {
    if (!lightboxOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen, close, prev, next]);

  const cover = all[0] || "/placeholder.svg";
  const hasImages = all.length > 0;
  const posterImage = validAfter[0] || validBefore[0] || "/og.png";
  const extraVideos = useMemo(
    () => [...before, ...after].filter(isVideoUrl).map((url) => ({ url, title: "" })),
    [before, after]
  );
  const allVideos = useMemo(() => [...videos, ...extraVideos], [videos, extraVideos]);
  const photoCount = validBefore.length + validAfter.length;
  const heroBefore = validBefore[0] || cover;
  const heroAfter = validAfter[0] || validBefore[0] || cover;
  const hasAfter = validAfter.length > 0;
  const afterIndex = hasAfter ? validBefore.length : 0;

  return (
    <div className="card overflow-hidden p-6 space-y-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs uppercase text-white/60">Repair story</div>
          <div className="font-semibold text-xl text-white">{title}</div>
        </div>
        <div className="flex flex-wrap gap-2 text-xs text-white/80">
          <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1">{photoCount} photos</span>
          {allVideos.length > 0 && (
            <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1">{allVideos.length} videos</span>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        {hasImages ? (
          <button
            type="button"
            onClick={() => openAt(0)}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 focus:outline-none focus:ring-2 focus:ring-white/40"
            aria-label={`Open before images for ${title}`}
          >
            <Image
              src={heroBefore}
              alt={`${title} before repair`}
              width={1200}
              height={800}
              className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white">Before</div>
          </button>
        ) : allVideos.length > 0 ? (
          // eslint-disable-next-line jsx-a11y/media-has-caption
          <video
            src={allVideos[0].url}
            className="w-full h-72 object-cover rounded-2xl border border-white/10"
            controls
            preload="metadata"
            poster={posterImage}
          />
        ) : (
          <Image src={cover} alt={title} width={1200} height={800} className="h-72 w-full rounded-2xl object-cover" />
        )}

        {hasAfter ? (
          <button
            type="button"
            onClick={() => openAt(afterIndex)}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 focus:outline-none focus:ring-2 focus:ring-white/40"
            aria-label={`Open after images for ${title}`}
          >
            <Image
              src={heroAfter}
              alt={`${title} after repair`}
              width={1200}
              height={800}
              className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute left-3 top-3 rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold text-white shadow-glow">
              After
            </div>
          </button>
        ) : hasImages ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-white/70">After photos coming soon.</div>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-white/70">After photos coming soon.</div>
        )}
      </div>

      {hasImages && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm text-white/70">
            <span>Swipe through the full photo set</span>
            <button
              type="button"
              onClick={() => openAt(0)}
              className="text-white font-semibold underline decoration-brand-500/70 underline-offset-4 hover:text-white"
            >
              View slideshow
            </button>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {all.map((src, i) => {
              const isBefore = i < validBefore.length;
              return (
                <button
                  key={`thumb-${src}-${i}`}
                  type="button"
                  onClick={() => openAt(i)}
                  className={`relative aspect-video h-24 min-w-[170px] overflow-hidden rounded-lg border ${
                    i === index ? "border-white" : "border-white/20"
                  } focus:outline-none focus:ring-2 focus:ring-white/40`}
                  aria-label={`Open ${isBefore ? "before" : "after"} image ${i + 1} of ${title}`}
                >
                  <Image src={src} alt="" width={200} height={120} className="h-full w-full object-cover" />
                  <span className="absolute left-2 top-2 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                    {isBefore ? "Before" : "After"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {allVideos.length > 0 && (
        <div className="space-y-3">
          <div className="text-xs uppercase text-white/60">Videos</div>
          <div className="grid md:grid-cols-2 gap-4">
            {allVideos.map((v, i) => (
              <div key={`vid-${i}`} className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                <video src={v.url} className="w-full h-48 object-cover" controls preload="metadata" poster={posterImage} />
                {v.title ? (
                  <div className="text-white/80 text-sm px-3 py-2">{v.title}</div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={close}
            className="absolute inset-0 cursor-zoom-out"
            aria-label="Close"
          />

          <div className="relative z-10 w-full">
            <div
              className={`relative w-full ${
                expanded ? "max-w-7xl h-[80vh]" : "max-w-5xl aspect-[16/10]"
              } bg-black/40 rounded-lg overflow-hidden transition-[max-width,height] duration-300`}
              onDoubleClick={(e) => {
                e.stopPropagation();
                setExpanded((v) => !v);
              }}
              title="Double-click to enlarge"
            >
              <Image
                src={all[index]}
                alt={title}
                fill
                sizes="(max-width: 1024px) 100vw, 900px"
                className="object-contain"
                priority
              />

              {/* Controls */}
              {all.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      prev();
                    }}
                    className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 hover:bg-white/20 p-2"
                    aria-label="Previous image"
                  >
                    {"<"}
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      next();
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 hover:bg-white/20 p-2"
                    aria-label="Next image"
                  >
                    {">"}
                  </button>
                </>
              )}
              <div className="absolute top-3 right-3 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white">
                Double-click to {expanded ? "shrink" : "enlarge"}
              </div>
            </div>

            {/* Pager thumbnails inside modal */}
            {all.length > 1 && (
              <div className="mt-3 grid grid-cols-8 md:grid-cols-12 gap-2">
                {all.map((src, i) => (
                  <button
                    key={`lb-${src}-${i}`}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIndex(i);
                    }}
                    className={`relative aspect-video w-full overflow-hidden rounded-md border ${
                      i === index ? "border-white" : "border-white/20"
                    }`}
                    aria-label={`Go to image ${i + 1}`}
                  >
                    <Image src={src} alt="" width={200} height={120} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
