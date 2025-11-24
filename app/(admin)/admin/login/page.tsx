"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveAdminToken } from "@/lib/clientAuth";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<string>("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");
      saveAdminToken(data.token);
      router.push("/admin/dashboard");
    } catch (err: any) {
      setMsg(err.message || "Login failed");
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <form onSubmit={onSubmit} className="w-full max-w-md rounded-xl border border-white/10 bg-white/5 p-6">
        <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
        {msg && <div className="text-red-500 mb-3">{msg}</div>}
        <label className="block text-sm mb-1">Email</label>
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
        <button className="w-full btn btn-primary">Login</button>
      </form>
    </div>
  );
}
