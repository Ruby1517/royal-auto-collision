"use client";
import { useEffect, useMemo, useState } from "react";
import { uploadFilesToFirebase } from "@/lib/uploadToFirebase";

export default function EstimateForm(){
  const [submitted, setSubmitted] = useState(false);
  const [photos, setPhotos] = useState<File[]>([]);
  const previews = useMemo(() => photos.map(f => URL.createObjectURL(f)), [photos]);
  useEffect(() => () => { previews.forEach(URL.revokeObjectURL); }, [previews]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      // 1) Upload photos selected (can be picked in multiple batches)
      let photoUrls: string[] = [];
      if (photos.length > 0) {
        photoUrls = await uploadFilesToFirebase(photos, "estimates/photos");
      }

      // 2) Build payload and create estimate
      const name = String(data.get("name") || "");
      const email = String(data.get("email") || "");
      const phone = String(data.get("phone") || "");
      const make = String(data.get("make") || "");
      const model = String(data.get("model") || "");
      const year = String(data.get("year") || "");
      const description = String(data.get("description") || "");
      const vehicle = [year, make, model].filter(Boolean).join(" ");

      const res = await fetch("/api/estimates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          vehicle,
          damage: description,
          imageUrls: photoUrls,
        }),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.message || "Failed to submit");

      setSubmitted(true);
      form.reset();
      setPhotos([]);
    } catch (err) {
      console.error(err);
      alert((err as any)?.message || "Something went wrong");
    }
  }

  if (submitted){
    return (
      <div className="card p-6">
        <div className="text-xl font-semibold text-gold">Thanks! We received your request.</div>
        <p className="text-white/80 mt-2">We’ll reach out soon with next steps.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 card p-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Full Name</label>
          <input required name="name" className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 outline-none focus:border-brand-500" placeholder="Jane Doe"/>
        </div>
        <div>
          <label className="block text-sm font-medium">Phone</label>
          <input required name="phone" type="tel" className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 outline-none focus:border-brand-500" placeholder="(555) 123-4567"/>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input required name="email" type="email" className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 outline-none focus:border-brand-500" placeholder="you@example.com"/>
        </div>
        <div>
          <label className="block text-sm font-medium">Preferred Contact</label>
          <select
            name="contact"
            className="mt-1 w-full rounded-lg bg-transparent text-white border border-white/10 px-3 py-2 outline-none focus:border-brand-500 appearance-none"
          >
            <option className="bg-ink text-white">Phone</option>
            <option className="bg-ink text-white">Email</option>
            <option className="bg-ink text-white">Text</option>
          </select>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium">Vehicle Make</label>
          <input required name="make" className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 outline-none focus:border-brand-500" placeholder="Toyota"/>
        </div>
        <div>
          <label className="block text-sm font-medium">Model</label>
          <input required name="model" className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 outline-none focus:border-brand-500" placeholder="Camry"/>
        </div>
        <div>
          <label className="block text-sm font-medium">Year</label>
          <input required name="year" type="number" className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 outline-none focus:border-brand-500" placeholder="2022" min="1980" max="2099"/>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium">Damage Description</label>
        <textarea required name="description" className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 outline-none focus:border-brand-500" rows={4} placeholder="Where is the damage? Drivable? Any safety concerns?"/>
      </div>
      <div>
        <label className="block text-sm font-medium">Photos (optional)</label>
        <label className="btn btn-outline mt-1 inline-flex items-center gap-2 cursor-pointer">
          Select Photos
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => {
              const files = e.target.files ? Array.from(e.target.files) : [];
              if (files.length) setPhotos((prev) => [...prev, ...files]);
              // allow re-selecting the same file
              e.currentTarget.value = "";
            }}
          />
        </label>
        {previews.length > 0 && (
          <div className="mt-3 grid grid-cols-3 md:grid-cols-4 gap-2">
            {previews.map((src, i) => (
              <div key={i} className="relative group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" className="w-full h-24 object-cover rounded-lg border border-white/10" />
                <button
                  type="button"
                  onClick={() => setPhotos((prev) => prev.filter((_, idx) => idx !== i))}
                  className="absolute top-1 right-1 hidden group-hover:block bg-black/60 text-white text-xs px-2 py-1 rounded"
                  aria-label="Remove photo"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
        <p className="text-xs text-white/60 mt-1">Tip: Include wide shots and close-ups of damage.</p>
      </div>
      <div className="pt-2">
        <button className="btn btn-primary" type="submit">Submit Request</button>
      </div>
    </form>
  );
}
