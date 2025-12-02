"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { clearAdminToken, getAdminToken } from "@/lib/clientAuth";

type GalleryItem = {
  _id: string;
  title: string;
  description?: string;
  beforeMedia: string[];
  afterMedia: string[];
  videos?: Array<{ url: string; title?: string }>;
};

export default function AdminGalleryPage() {
  const router = useRouter();
  const token = useMemo(() => getAdminToken(), []);
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<GalleryItem | null>(null);
  const [saving, setSaving] = useState(false);
  const removeMedia = (kind: "before" | "after", index: number) => {
    if (!editing) return;
    if (kind === "before") {
      const next = [...editing.beforeMedia];
      next.splice(index, 1);
      setEditing({ ...editing, beforeMedia: next });
    } else {
      const next = [...editing.afterMedia];
      next.splice(index, 1);
      setEditing({ ...editing, afterMedia: next });
    }
  };
  const removeVideo = (index: number) => {
    if (!editing) return;
    const next = [...(editing.videos || [])];
    next.splice(index, 1);
    setEditing({ ...editing, videos: next });
  };

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

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/gallery", { cache: "no-store" });
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function deleteItem(id: string) {
    if (!confirm("Delete this before & after item?")) return;
    const res = await fetch(`/api/gallery/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) load();
    else alert("Delete failed");
  }

  async function deleteVideo(itemId: string, url: string) {
    const res = await fetch(`/api/gallery/${itemId}/videos`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ url }),
    });
    if (res.ok) load();
    else alert("Video delete failed");
  }

  async function saveItem() {
    if (!editing) return;
    setSaving(true);
    const res = await fetch(`/api/gallery/${editing._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        title: editing.title,
        description: editing.description,
        beforeMedia: editing.beforeMedia,
        afterMedia: editing.afterMedia,
        videos: editing.videos || [],
      }),
    });
    setSaving(false);
    if (res.ok) {
      setEditing(null);
      load();
    } else {
      alert("Save failed");
    }
  }

  return (
    <div className="container-xl py-10 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="btn btn-outline" onClick={() => router.push("/admin/dashboard")}>← Back</button>
          <h1 className="text-2xl font-bold">Before & After Library</h1>
        </div>
        <button className="btn btn-outline text-sm" onClick={load}>Refresh</button>
      </div>

      {loading ? (
        <div className="p-6">Loading...</div>
      ) : items.length === 0 ? (
        <div className="p-6 text-white/70">No entries yet.</div>
      ) : (
        <div className="grid gap-4">
          {items.map((it) => (
            <div key={it._id} className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm uppercase text-white/60">Title</div>
                  <div className="text-lg font-semibold text-white">{it.title}</div>
                  <div className="text-white/70 text-sm">{it.description}</div>
                  <div className="text-xs text-white/60 mt-1">
                    {it.beforeMedia.length} before | {it.afterMedia.length} after | {(it.videos || []).length} videos
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="btn btn-outline text-sm" onClick={() => setEditing(it)}>Edit</button>
                  <button className="btn btn-outline text-sm" onClick={() => deleteItem(it._id)}>Delete</button>
                </div>
              </div>
              {(it.videos || []).length > 0 ? (
                <div className="text-sm text-white/80 space-y-1">
                  <div className="text-white/70 text-xs uppercase">Videos</div>
                  {(it.videos || []).map((v) => (
                    <div key={v.url} className="flex items-center justify-between gap-2 rounded-lg border border-white/10 px-3 py-2">
                      <span className="truncate">{v.title || v.url}</span>
                      <button className="btn btn-outline text-xs" onClick={() => deleteVideo(it._id, v.url)}>Delete</button>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      )}

      {editing && (
        <div className="card p-6 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Edit entry</h3>
            <button className="text-white/70 text-sm" onClick={() => setEditing(null)}>Close</button>
          </div>
          <div>
            <label className="block text-sm mb-1">Title</label>
            <input
              className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2"
              value={editing.title}
              onChange={(e) => setEditing({ ...editing, title: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Description</label>
            <input
              className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2"
              value={editing.description || ""}
              onChange={(e) => setEditing({ ...editing, description: e.target.value })}
            />
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-sm">Before media</label>
                <span className="text-xs text-white/60">{editing.beforeMedia.length} items</span>
              </div>
              {editing.beforeMedia.length === 0 ? (
                <div className="text-white/60 text-sm">No before media.</div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  {editing.beforeMedia.map((url, idx) => (
                    <div key={`${url}-${idx}`} className="relative overflow-hidden rounded-lg border border-white/10">
                      <button
                        type="button"
                        className="absolute right-2 top-2 z-10 rounded-full bg-black/70 px-2 text-xs hover:bg-black/90"
                        onClick={() => removeMedia("before", idx)}
                        aria-label="Remove"
                      >
                        ×
                      </button>
                      <img src={url} alt={`Before ${idx + 1}`} className="h-28 w-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-sm">After media</label>
                <span className="text-xs text-white/60">{editing.afterMedia.length} items</span>
              </div>
              {editing.afterMedia.length === 0 ? (
                <div className="text-white/60 text-sm">No after media.</div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  {editing.afterMedia.map((url, idx) => (
                    <div key={`${url}-${idx}`} className="relative overflow-hidden rounded-lg border border-white/10">
                      <button
                        type="button"
                        className="absolute right-2 top-2 z-10 rounded-full bg-black/70 px-2 text-xs hover:bg-black/90"
                        onClick={() => removeMedia("after", idx)}
                        aria-label="Remove"
                      >
                        ×
                      </button>
                      <img src={url} alt={`After ${idx + 1}`} className="h-28 w-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm mb-1">Before (one per line)</label>
              <textarea
                className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2"
                rows={4}
                value={(editing.beforeMedia || []).join("\n")}
                onChange={(e) => setEditing({ ...editing, beforeMedia: e.target.value.split("\n").map((s) => s.trim()).filter(Boolean) })}
              />
            </div>
            <div>
              <label className="block text-sm mb-1">After (one per line)</label>
              <textarea
                className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2"
                rows={4}
                value={(editing.afterMedia || []).join("\n")}
                onChange={(e) => setEditing({ ...editing, afterMedia: e.target.value.split("\n").map((s) => s.trim()).filter(Boolean) })}
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-sm">Videos</label>
              <span className="text-xs text-white/60">{(editing.videos || []).length} items</span>
            </div>
            {(editing.videos || []).length === 0 ? (
              <div className="text-white/60 text-sm">No videos.</div>
            ) : (
              <div className="grid md:grid-cols-2 gap-2">
                {(editing.videos || []).map((v, idx) => (
                  <div key={`${v.url}-${idx}`} className="relative rounded-lg border border-white/10 bg-white/5 p-3">
                    <button
                      type="button"
                      className="absolute right-2 top-2 z-10 rounded-full bg-black/70 px-2 text-xs hover:bg-black/90"
                      onClick={() => removeVideo(idx)}
                      aria-label="Remove video"
                    >
                      ×
                    </button>
                    <div className="text-sm font-semibold truncate">{v.title || "Untitled video"}</div>
                    <div className="text-xs text-white/70 break-all">{v.url}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm mb-1">Videos (url|title per line)</label>
            <textarea
              className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2"
              rows={3}
              value={(editing.videos || []).map((v) => `${v.url}|${v.title || ""}`).join("\n")}
              onChange={(e) => {
                const videos = e.target.value
                  .split("\n")
                  .map((line) => line.trim())
                  .filter(Boolean)
                  .map((line) => {
                    const [url, title = ""] = line.split("|");
                    return { url: url.trim(), title: title.trim() };
                  })
                  .filter((v) => v.url.length > 0);
                setEditing({ ...editing, videos });
              }}
            />
          </div>
          <div className="flex gap-2">
            <button className="btn btn-primary" onClick={saveItem} disabled={saving}>{saving ? "Saving..." : "Save"}</button>
            <button className="btn btn-outline" onClick={() => setEditing(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
