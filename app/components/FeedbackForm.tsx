"use client";

import { useState } from "react";

export default function FeedbackForm() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMsg(null);
    setLoading(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(data.get("name") || ""),
          rating: Number(data.get("rating") || 5),
          text: String(data.get("text") || ""),
        }),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body?.message || "Failed to submit");
      setDone(true);
      setMsg("Thanks! Your feedback was submitted and is pending review.");
      form.reset();
    } catch (err: any) {
      setMsg(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form id="feedback" onSubmit={onSubmit} className="card p-6 grid gap-4">
      <div className="text-xl font-semibold">Send Your Feedback</div>
      {msg && (
        <div className={done ? "text-green-500" : "text-red-500"}>{msg}</div>
      )}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Your Name</label>
          <input
            name="name"
            required
            className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 outline-none focus:border-brand-500"
            placeholder="Jane D."
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Rating</label>
          <select
            name="rating"
            defaultValue={5}
            className="mt-1 w-full rounded-lg bg-transparent text-white border border-white/10 px-3 py-2 outline-none focus:border-brand-500 appearance-none"
          >
            {[5,4,3,2,1].map((r) => (
              <option key={r} value={r} className="bg-ink text-white">{r} / 5</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium">Feedback</label>
        <textarea
          name="text"
          required
          rows={4}
          className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 outline-none focus:border-brand-500"
          placeholder="How was your experience?"
        />
      </div>
      <div>
        <button className="btn btn-primary" disabled={loading}>
          {loading ? "Sending..." : "Submit Feedback"}
        </button>
      </div>
    </form>
  );
}
