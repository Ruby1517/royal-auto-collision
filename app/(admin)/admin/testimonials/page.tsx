"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { clearAdminToken, getAdminToken } from "@/lib/clientAuth";
import StarRating from "@/app/components/StarRating";

type TItem = {
  _id: string;
  name: string;
  text: string;
  rating?: number;
  approved: boolean;
  createdAt: string;
};

export default function AdminTestimonialsPage() {
  const router = useRouter();
  const token = useMemo(() => getAdminToken(), []);
  const [tab, setTab] = useState<"pending" | "approved" | "all">("pending");
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<TItem[]>([]);

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

  async function load(status: "pending" | "approved" | "all") {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/testimonials?status=${status}`, { cache: "no-store" });
      const data = await res.json();
      setItems(Array.isArray(data.items) ? data.items : []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(tab); }, [tab]);

  async function setApproval(id: string, approved: boolean) {
    if (!token) return router.replace("/admin/login");
    const res = await fetch(`/api/admin/testimonials/${id}/approve`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ approved }),
    });
    if (res.ok) load(tab);
    else alert("Failed to update");
  }

  return (
    <div className="container-xl py-10">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button className="btn btn-outline" onClick={() => router.push("/admin/dashboard")}>← Back to Dashboard</button>
          <h1 className="text-2xl font-bold">Testimonials</h1>
        </div>
        <div className="inline-flex rounded-xl border border-white/10 bg-white/5 p-1">
          {(["pending", "approved", "all"] as const).map((t) => (
            <button key={t} className={`px-4 py-2 rounded-lg ${tab === t ? "bg-white/10" : "hover:bg-white/10"}`} onClick={() => setTab(t)}>
              {t[0].toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="p-6">Loading...</div>
      ) : items.length === 0 ? (
        <div className="p-6 text-white/70">No testimonials in this view.</div>
      ) : (
        <div className="grid gap-4">
          {items.map((it) => (
            <div key={it._id} className="card p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-semibold text-lg">{it.name}</div>
                  <div className="mt-1"><StarRating value={typeof it.rating === 'number' ? it.rating : 5} /></div>
                  <div className="text-white/80 mt-2 whitespace-pre-wrap">{it.text}</div>
                </div>
                <div className="shrink-0 text-right">
                  <div className="text-xs uppercase text-white/60">Submitted</div>
                  <div className="text-white/80">{new Date(it.createdAt).toLocaleString()}</div>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                {it.approved ? (
                  <>
                    <span className="inline-flex items-center text-green-400">Approved</span>
                    <button className="btn btn-outline" onClick={() => setApproval(it._id, false)}>Unapprove</button>
                  </>
                ) : (
                  <button className="btn btn-primary" onClick={() => setApproval(it._id, true)}>Approve</button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

