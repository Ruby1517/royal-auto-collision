"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { clearAdminToken, getAdminToken } from "@/lib/clientAuth";
import UploadBeforeAfter from "@/app/components/admin/UploadbeforeAfter";

type Admin = { email: string; role: "admin" | "user" };

export default function AdminUploadBeforeAfterPage() {
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
    <div className="container-xl py-10 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-white/60">Admin</p>
          <h1 className="text-2xl font-bold">Upload Before & After</h1>
          <p className="text-white/70">Publish new before/after items and videos to the Gallery.</p>
        </div>
        <button className="btn btn-outline" onClick={() => router.push("/admin/dashboard")}>Back to Dashboard</button>
      </div>

      <div className="card p-6">
        <UploadBeforeAfter />
      </div>
    </div>
  );
}
