"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminRegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [setupKey, setSetupKey] = useState("");
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    try {
      const res = await fetch("/api/admin/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ setupKey, email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed");
      setMsg({ type: "ok", text: "Admin created. You can log in now." });
      setTimeout(() => router.push("/admin/login"), 800);
    } catch (err: any) {
      setMsg({ type: "err", text: err.message || "Something went wrong" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <form onSubmit={onSubmit} className="w-full max-w-md rounded-xl border border-white/10 bg-white/5 p-6">
        <h1 className="text-2xl font-bold mb-4">Create Admin</h1>
        {msg && (
          <div className={`${msg.type === "ok" ? "text-green-500" : "text-red-500"} mb-3`}>
            {msg.text}
          </div>
        )}
        <label className="block text-sm mb-1">Setup Key</label>
        <input
          className="w-full mb-3 rounded-lg bg-white/5 border border-white/10 px-3 py-2"
          value={setupKey}
          onChange={(e) => setSetupKey(e.target.value)}
          required
        />
        <label className="block text-sm mb-1">Admin Email</label>
        <input
          type="email"
          className="w-full mb-3 rounded-lg bg-white/5 border border-white/10 px-3 py-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label className="block text-sm mb-1">Password</label>
        <input
          type="password"
          className="w-full mb-4 rounded-lg bg-white/5 border border-white/10 px-3 py-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          disabled={loading}
          className="w-full btn btn-primary disabled:opacity-60"
        >
          {loading ? "Creating..." : "Create Admin"}
        </button>
      </form>
    </div>
  );
}
