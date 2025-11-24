"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { clearAdminToken, getAdminToken } from "@/lib/clientAuth";

type Estimate = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  vehicle: string;
  damage: string;
  imageUrls?: string[];
  status: "pending" | "completed";
  createdAt: string;
};

export default function AdminEstimatesPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"pending" | "completed">("pending");
  const [items, setItems] = useState<Estimate[]>([]);
  const [total, setTotal] = useState(0);
  // Lightbox state for viewing photos large with zoom
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lbImages, setLbImages] = useState<string[]>([]);
  const [lbIndex, setLbIndex] = useState(0);
  const [lbScale, setLbScale] = useState(1);
  const [lbOffset, setLbOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);

  const token = useMemo(() => getAdminToken(), []);

  useEffect(() => {
    async function ensureAdmin() {
      if (!token) return router.replace("/admin/login");
      try {
        const res = await fetch("/api/admin/me", { headers: { Authorization: `Bearer ${token}` } });
        if (!res.ok) throw new Error("Unauthorized");
      } catch {
        clearAdminToken();
        router.replace("/admin/login");
      }
    }
    ensureAdmin();
  }, [router, token]);

  async function load(status: "pending" | "completed") {
    setLoading(true);
    try {
      const res = await fetch(`/api/estimates?status=${status}&limit=50`, { cache: "no-store" });
      if (!res.ok) {
        setItems([]);
        setTotal(0);
      } else {
        const data = await res.json().catch(() => ({ estimates: [], totalCount: 0 }));
        setItems(data.estimates || []);
        setTotal(data.totalCount || 0);
      }
    } catch {
      setItems([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(tab); }, [tab]);

  async function updateStatus(id: string, status: "pending" | "completed") {
    if (!token) return router.replace("/admin/login");
    const res = await fetch(`/api/estimates/${id}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status }),
    });
    if (res.ok) load(tab);
    else alert("Failed to update status");
  }

  return (
    <>
    <div className="container-xl py-10">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button
            className="btn btn-outline"
            onClick={() => router.push("/admin/dashboard")}
          >
            ← Back to Dashboard
          </button>
          <h1 className="text-2xl font-bold">Estimates</h1>
        </div>
        <div className="inline-flex rounded-xl border border-white/10 bg-white/5 p-1">
          <button className={`px-4 py-2 rounded-lg ${tab === "pending" ? "bg-white/10" : "hover:bg-white/10"}`} onClick={() => setTab("pending")}>Pending</button>
          <button className={`px-4 py-2 rounded-lg ${tab === "completed" ? "bg-white/10" : "hover:bg-white/10"}`} onClick={() => setTab("completed")}>Completed</button>
        </div>
      </div>

      {loading ? (
        <div className="p-6">Loading...</div>
      ) : items.length === 0 ? (
        <div className="p-6 text-white/70">No {tab} estimates.</div>
      ) : (
        <div className="grid gap-4">
          {items.map((it) => (
            <div key={it._id} className="card p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-semibold text-lg">{it.name} <span className="text-white/60 text-sm">({it.email}{it.phone ? ` • ${it.phone}` : ""})</span></div>
                  <div className="text-white/80 text-sm mt-1">{it.vehicle}</div>
                  <div className="text-white/70 mt-2 whitespace-pre-wrap">{it.damage}</div>
                </div>
                <div className="shrink-0 text-right">
                  <div className="text-xs uppercase text-white/60">Submitted</div>
                  <div className="text-white/80">{new Date(it.createdAt).toLocaleString()}</div>
                </div>
              </div>

              {it.imageUrls && it.imageUrls.length > 0 && (
                <div className="mt-3 grid grid-cols-4 md:grid-cols-6 gap-2">
                  {it.imageUrls.slice(0, 8).map((url, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        setLbImages(it.imageUrls || []);
                        setLbIndex(i);
                        setLbScale(1);
                        setLbOffset({ x: 0, y: 0 });
                        setLightboxOpen(true);
                      }}
                      className="relative group"
                      aria-label="Open photo"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={url} alt="" className="w-full aspect-square object-cover rounded-lg" />
                      <span className="pointer-events-none absolute inset-0 rounded-lg bg-black/0 group-hover:bg-black/20 transition" />
                    </button>
                  ))}
                </div>
              )}

              <div className="mt-4 flex gap-2">
                {it.status === "pending" ? (
                  <button className="btn btn-primary" onClick={() => updateStatus(it._id, "completed")}>Mark Completed</button>
                ) : (
                  <button className="btn btn-outline" onClick={() => updateStatus(it._id, "pending")}>Reopen</button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    {/* Lightbox modal */}
    {lightboxOpen && (
      <div
        className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        onKeyDown={(e) => {
          if (e.key === "Escape") setLightboxOpen(false);
          if (e.key === "ArrowLeft") setLbIndex((i) => (i - 1 + lbImages.length) % lbImages.length);
          if (e.key === "ArrowRight") setLbIndex((i) => (i + 1) % lbImages.length);
        }}
        tabIndex={-1}
      >
        <button
          type="button"
          className="absolute inset-0 cursor-zoom-out"
          aria-label="Close"
          onClick={() => setLightboxOpen(false)}
        />

        <div className="relative z-10 max-w-6xl w-full">
          <div
            className="relative bg-black/40 rounded-lg overflow-hidden"
            style={{ width: "100%", height: "70vh" }}
            onWheel={(e) => {
              e.preventDefault();
              const delta = e.deltaY > 0 ? -0.1 : 0.1;
              setLbScale((s) => Math.max(1, Math.min(5, s + delta)));
            }}
            onMouseDown={(e) => {
              e.preventDefault();
              setDragging(true);
              setDragStart({ x: e.clientX - lbOffset.x, y: e.clientY - lbOffset.y });
            }}
            onMouseMove={(e) => {
              if (!dragging || !dragStart) return;
              setLbOffset({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
            }}
            onMouseUp={() => { setDragging(false); setDragStart(null); }}
            onMouseLeave={() => { setDragging(false); setDragStart(null); }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={lbImages[lbIndex]}
              alt="Estimate photo"
              className={`absolute inset-0 m-auto select-none ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
              style={{
                transform: `translate(${lbOffset.x}px, ${lbOffset.y}px) scale(${lbScale})`,
                transformOrigin: "center center",
                maxWidth: "100%",
                maxHeight: "100%",
              }}
              draggable={false}
            />

            {/* Controls */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
              <button
                type="button"
                className="rounded-full bg-white/15 hover:bg-white/25 px-3 py-1"
                onClick={(e) => { e.stopPropagation(); setLbIndex((i) => (i - 1 + lbImages.length) % lbImages.length); }}
                aria-label="Previous"
              >
                ‹
              </button>
              <button
                type="button"
                className="rounded-full bg-white/15 hover:bg-white/25 px-3 py-1"
                onClick={(e) => { e.stopPropagation(); setLbIndex((i) => (i + 1) % lbImages.length); }}
                aria-label="Next"
              >
                ›
              </button>
              <button
                type="button"
                className="rounded-full bg-white/15 hover:bg-white/25 px-3 py-1"
                onClick={(e) => { e.stopPropagation(); setLbScale((s) => Math.max(1, s - 0.25)); }}
                aria-label="Zoom out"
              >
                −
              </button>
              <button
                type="button"
                className="rounded-full bg-white/15 hover:bg-white/25 px-3 py-1"
                onClick={(e) => { e.stopPropagation(); setLbScale((s) => Math.min(5, s + 0.25)); }}
                aria-label="Zoom in"
              >
                +
              </button>
              <button
                type="button"
                className="rounded-full bg-white/15 hover:bg-white/25 px-3 py-1"
                onClick={(e) => { e.stopPropagation(); setLbScale(1); setLbOffset({ x: 0, y: 0 }); }}
                aria-label="Reset zoom"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Pager thumbnails */}
          {lbImages.length > 1 && (
            <div className="mt-3 grid grid-cols-6 md:grid-cols-10 gap-2">
              {lbImages.map((src, i) => (
                <button
                  key={`${src}-${i}`}
                  type="button"
                  className={`relative aspect-video w-full overflow-hidden rounded-md border ${i === lbIndex ? "border-white" : "border-white/20"}`}
                  onClick={(e) => { e.stopPropagation(); setLbIndex(i); setLbScale(1); setLbOffset({ x: 0, y: 0 }); }}
                  aria-label={`Go to image ${i + 1}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    )}
    </>
  );
}
