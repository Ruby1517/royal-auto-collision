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
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div className="flex items-center gap-3">
          <span className="text-white/80">{admin?.email}</span>
          <button
            className="btn btn-outline"
            onClick={() => { clearAdminToken(); router.push("/admin/login"); }}
          >
            Logout
          </button>
        </div>
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
          <h2 className="text-xl font-semibold mb-2">Testimonials</h2>
          <p className="text-white/70 mb-4">Approve or unapprove customer feedback.</p>
          <button className="btn btn-outline" onClick={() => router.push("/admin/testimonials")}>Manage Testimonials</button>
        </div>
      </div>
    </div>
  );
}
