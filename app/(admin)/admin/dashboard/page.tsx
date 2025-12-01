"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { clearAdminToken, getAdminToken } from "@/lib/clientAuth";
import UploadBeforeAfter from "../../../components/admin/UploadbeforeAfter";

type Admin = { email: string; role: "admin" | "user" };

export default function AdminDashboardPage() {
  const router = useRouter();
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [loading, setLoading] = useState(true);
  const nav = [
    { href: "/admin/dashboard", label: "Dashboard" },
    { href: "/admin/estimates", label: "Estimates" },
    { href: "/admin/gallery", label: "Before & After" },
    { href: "/admin/upload-before-after", label: "Upload Before & After" },
    { href: "/admin/cars", label: "Cars for Sale" },
    { href: "/admin/testimonials", label: "Testimonials" },
  ];

  useEffect(() => {
    async function load() {
      const token = getAdminToken();
      if (!token) return router.replace("/admin/login");
      try {
        const res = await fetch("/api/admin/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Unauthorized");
        const data = await res.json();
        setAdmin(data);
      } catch {
        clearAdminToken();
        router.replace("/admin/login");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [router]);

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="container-xl py-10">
      <div className="flex flex-col gap-6 md:grid md:grid-cols-[240px_1fr] md:items-start">
        <aside className="rounded-2xl border border-white/10 bg-white/5 p-4 md:sticky md:top-6 md:self-start space-y-4">
          <div>
            <div className="text-sm uppercase tracking-[0.25em] text-white/60">Admin</div>
            <div className="text-xl font-bold text-white">Control Panel</div>
            <div className="text-white/70 text-sm mt-1">{admin?.email}</div>
          </div>
          <nav className="space-y-2">
            {nav.map((item) => (
              <button
                key={item.href}
                className="w-full text-left rounded-lg px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white"
                onClick={() => router.push(item.href)}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <button
            className="btn btn-outline w-full"
            onClick={() => { clearAdminToken(); router.push("/admin/login"); }}
          >
            Logout
          </button>
        </aside>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="card p-6">
              <h2 className="text-xl font-semibold mb-2">Estimates</h2>
              <p className="text-white/70 mb-4">Review pending requests and mark them completed.</p>
              <button className="btn btn-primary" onClick={() => router.push("/admin/estimates")}>Open Estimates</button>
            </div>
              <div className="card p-6">
                <h2 className="text-xl font-semibold mb-4">Upload Before & After</h2>
                <UploadBeforeAfter />
              </div>
            <div className="card p-6">
              <h2 className="text-xl font-semibold mb-2">Manage Before & After</h2>
              <p className="text-white/70 mb-4">Edit or delete gallery items and attached videos.</p>
              <button className="btn btn-outline" onClick={() => router.push("/admin/gallery")}>Open gallery list</button>
            </div>
            <div className="card p-6">
              <h2 className="text-xl font-semibold mb-2">Testimonials</h2>
              <p className="text-white/70 mb-4">Approve or unapprove customer feedback.</p>
              <button className="btn btn-outline" onClick={() => router.push("/admin/testimonials")}>Manage Testimonials</button>
            </div>
            <div className="card p-6">
              <h2 className="text-xl font-semibold mb-2">Cars for Sale</h2>
              <p className="text-white/70 mb-4">Upload vehicle photos and details to list on the site.</p>
              <button className="btn btn-outline" onClick={() => router.push("/admin/cars")}>Upload a car</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
