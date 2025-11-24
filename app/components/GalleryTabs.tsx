"use client";

import GalleryItemCard from "@/app/components/GalleryItemCard";
import React from "react";

type Item = {
  _id: string;
  title: string;
  description?: string;
  beforeMedia: string[];
  afterMedia: string[];
  videos?: Array<{ url: string; title?: string }>;
};

export default function GalleryTabs({ items }: { items: Item[] }) {
  const isImageUrl = (u?: string) =>
    !!u && /\.(avif|webp|jpe?g|png|gif)$/i.test(u.split("?")[0]);
  const isVideoUrl = (u?: string) =>
    !!u && /\.(mp4|webm|mov|m4v|ogg)$/i.test(u.split("?")[0]);

  const hasAnyImages = items.some((it) =>
    [...(it.beforeMedia || []), ...(it.afterMedia || [])].some(isImageUrl)
  );
  const hasAnyVideos = items.some(
    (it) => (it.videos?.length || 0) > 0 || [...(it.beforeMedia || []), ...(it.afterMedia || [])].some(isVideoUrl)
  );
  const [tab, setTab] = React.useState<"images" | "videos">(() =>
    hasAnyImages ? "images" : hasAnyVideos ? "videos" : "images"
  );

  const imageItems = React.useMemo(() => {
    return items.filter((it) =>
      [...(it.beforeMedia || []), ...(it.afterMedia || [])].some(isImageUrl)
    );
  }, [items]);

  const videos = React.useMemo(() => {
    const out: Array<{ url: string; title: string; itemTitle: string }>=[];
    for (const it of items) {
      (it.videos || []).forEach((v) => {
        out.push({ url: v.url, title: v.title || "", itemTitle: it.title });
      });
      // Add any video URLs that were accidentally placed in before/after
      [...(it.beforeMedia || []), ...(it.afterMedia || [])]
        .filter(isVideoUrl)
        .forEach((url) => out.push({ url, title: "", itemTitle: it.title }));
    }
    return out;
  }, [items]);

  const tabOptions: Array<{ id: "images" | "videos"; label: string; blurb: string; count: number }> = [
    { id: "images", label: "Photo sets", blurb: "Before / after angles", count: imageItems.length },
    { id: "videos", label: "Walkthroughs", blurb: "Short clips of repairs", count: videos.length },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3">
        {tabOptions.map((option) => {
          const isActive = tab === option.id;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => setTab(option.id)}
              className={`relative overflow-hidden rounded-2xl border px-4 py-3 text-left transition ${
                isActive
                  ? "border-brand-500/60 bg-white/10 shadow-glow"
                  : "border-white/10 bg-white/5 hover:bg-white/10"
              }`}
              aria-pressed={isActive}
            >
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-white">{option.label}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs ${
                    isActive ? "bg-white/20 text-white" : "bg-white/10 text-white/70"
                  }`}
                >
                  {option.count}
                </span>
              </div>
              <p className="text-xs text-white/60">{option.blurb}</p>
              {isActive && <span className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-500 to-transparent" aria-hidden />}
            </button>
          );
        })}
      </div>

      {tab === "images" ? (
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
          {imageItems.length === 0 ? (
            <div className="card p-5 text-white/70">No photo sets yet.</div>
          ) : imageItems.map((it) => (
            <GalleryItemCard
              key={it._id}
              title={it.title}
              before={it.beforeMedia}
              after={it.afterMedia}
              videos={it.videos}
            />
          ))}
        </div>
      ) : videos.length === 0 ? (
        <div className="card p-5 text-white/70">No videos yet.</div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((v, i) => (
            <div key={`${v.url}-${i}`} className="card overflow-hidden">
              <div className="relative">
                {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                <video src={v.url} className="w-full h-52 object-cover" controls preload="metadata" poster="/og.png" />
                <div className="absolute top-3 left-3 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white">Video</div>
              </div>
              <div className="p-4">
                <div className="font-semibold text-white/90">{v.title || v.itemTitle || "Customer repair"}</div>
                {v.title && v.itemTitle && (
                  <div className="text-white/60 text-sm mt-1">{v.itemTitle}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
