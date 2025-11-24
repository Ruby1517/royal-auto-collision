"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { clearAdminToken, getAdminToken } from "@/lib/clientAuth";
import UploadCar from "@/app/components/admin/UploadCar";

type Admin = { email: string; role: "admin" | "user" };

export default function AdminCarsPage() {
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
          <h1 className="text-2xl font-bold">Upload car for sale</h1>
          <p className="text-white/70">Photos and details will appear on the Cars for Sale page.</p>
        </div>
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

      <div className="card p-6">
        <UploadCar />
      </div>
    </div>
  );
}
