"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { clearAdminToken, getAdminToken } from "@/lib/clientAuth";
import UploadBeforeAfter from "../../../components/admin/UploadbeforeAfter";

type Admin = { email: string; role: "admin" | "user"; createdAt?: string };

export default function AdminDashboardPage() {
  const router = useRouter();
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [savingPassword, setSavingPassword] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
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

  async function handlePasswordUpdate(e: React.FormEvent) {
    e.preventDefault();
    setPasswordMsg(null);
    if (newPassword !== confirmPassword) {
      setPasswordMsg({ type: "error", text: "New password and confirmation do not match." });
      return;
    }
    if (newPassword.length < 8) {
      setPasswordMsg({ type: "error", text: "Password must be at least 8 characters." });
      return;
    }
    const token = getAdminToken();
    if (!token) return router.replace("/admin/login");

    setSavingPassword(true);
    try {
      const res = await fetch("/api/admin/password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.status === 401) {
        clearAdminToken();
        router.replace("/admin/login");
        return;
      }
      if (!res.ok) throw new Error(data.message || "Failed to update password.");
      setPasswordMsg({ type: "success", text: "Password updated successfully." });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setPasswordMsg({ type: "error", text: err?.message || "Failed to update password." });
    } finally {
      setSavingPassword(false);
    }
  }

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
            <div className="card p-6" id="profile-card">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h2 className="text-xl font-semibold">Profile</h2>
                  <p className="text-white/70 text-sm">Manage your login details.</p>
                </div>
                {admin?.createdAt && (
                  <div className="text-xs text-white/60">
                    Joined {new Date(admin.createdAt).toLocaleDateString()}
                  </div>
                )}
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-3 mb-4">
                <div className="text-xs uppercase tracking-[0.2em] text-white/60 mb-1">Email</div>
                <div className="font-semibold">{admin?.email}</div>
              </div>
              <form className="space-y-3" onSubmit={handlePasswordUpdate}>
                <div>
                  <label className="block text-sm mb-1" htmlFor="current-password">Current password</label>
                  <input
                    id="current-password"
                    type="password"
                    className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1" htmlFor="new-password">New password</label>
                  <input
                    id="new-password"
                    type="password"
                    className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1" htmlFor="confirm-password">Confirm new password</label>
                  <input
                    id="confirm-password"
                    type="password"
                    className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                {passwordMsg && (
                  <div className={passwordMsg.type === "success" ? "text-green-400 text-sm" : "text-red-400 text-sm"}>
                    {passwordMsg.text}
                  </div>
                )}
                <button className="btn btn-primary w-full" disabled={savingPassword}>
                  {savingPassword ? "Updating..." : "Update password"}
                </button>
              </form>
            </div>
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
