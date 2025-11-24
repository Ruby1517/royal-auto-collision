"use client";

import { useEffect, useMemo, useState } from "react";
import { getAdminToken } from "@/lib/clientAuth";

type Msg = { type: "ok" | "err"; text: string } | null;

export default function UploadCar() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [mileage, setMileage] = useState("");
  const [drivetrain, setDrivetrain] = useState("");
  const [color, setColor] = useState("");
  const [vin, setVin] = useState("");
  const [location, setLocation] = useState("On-site showroom");
  const [description, setDescription] = useState("");
  const [highlightsText, setHighlightsText] = useState("Clean title\nOne owner");

  const [photos, setPhotos] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<Msg>(null);
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  const previews = useMemo(() => photos.map((f) => URL.createObjectURL(f)), [photos]);

  useEffect(() => {
    return () => {
      previews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previews]);

  function parseHighlights(raw: string) {
    return raw
      .split(/\n|,/)
      .map((h) => h.trim())
      .filter(Boolean);
  }

  function removePhoto(index: number) {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
    if (previews[index]) URL.revokeObjectURL(previews[index]);
  }

  function handleDragStart(i: number) {
    setDragIndex(i);
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }

  function handleDrop(i: number) {
    if (dragIndex === null || dragIndex === i) return;
    setPhotos((prev) => {
      const next = [...prev];
      const [moved] = next.splice(dragIndex, 1);
      next.splice(i, 0, moved);
      return next;
    });
    setDragIndex(null);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    try {
      const token = getAdminToken();
      if (!token) throw new Error("Not logged in");

      // Upload photos first
      const form = new FormData();
      photos.forEach((f) => form.append("photos", f));
      const uploadRes = await fetch("/api/upload", { method: "POST", body: form });
      const uploadData = await uploadRes.json();
      if (!uploadRes.ok) throw new Error(uploadData.message || "Upload failed");
      const photoUrls: string[] = uploadData.photoUrls || [];
      if (photoUrls.length === 0) throw new Error("Please add at least one photo.");

      const payload = {
        name,
        price,
        mileage,
        drivetrain,
        color,
        vin,
        location,
        description,
        highlights: parseHighlights(highlightsText),
        photos: photoUrls,
      };

      const res = await fetch("/api/cars", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to create car listing");

      setMsg({ type: "ok", text: "Car listing created successfully." });
      setName("");
      setPrice("");
      setMileage("");
      setDrivetrain("");
      setColor("");
      setVin("");
      setLocation("On-site showroom");
      setDescription("");
      setHighlightsText("Clean title\nOne owner");
      setPhotos([]);
    } catch (err: any) {
      setMsg({ type: "err", text: err.message || "Something went wrong" });
    } finally {
      setLoading(false);
      previews.forEach(URL.revokeObjectURL);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      {msg && (
        <div className={msg.type === "ok" ? "text-green-500" : "text-red-500"}>{msg.text}</div>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm mb-1">Car name</label>
          <input
            className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Price</label>
          <input
            className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="$32,500"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm mb-1">Mileage</label>
          <input
            className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2"
            value={mileage}
            onChange={(e) => setMileage(e.target.value)}
            placeholder="42,000 mi"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Drivetrain / engine</label>
          <input
            className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2"
            value={drivetrain}
            onChange={(e) => setDrivetrain(e.target.value)}
            placeholder="AWD • Turbo • Automatic"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Color</label>
          <input
            className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            placeholder="Pearl White"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm mb-1">VIN</label>
          <input
            className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2"
            value={vin}
            onChange={(e) => setVin(e.target.value)}
            placeholder="Last 6 is fine"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Location</label>
          <input
            className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="On-site showroom"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Highlights (comma or new line)</label>
          <textarea
            className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 h-24"
            value={highlightsText}
            onChange={(e) => setHighlightsText(e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm mb-1">Description (optional)</label>
        <textarea
          className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Condition, packages, service notes..."
        />
      </div>

      <div className="card p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold">Photos</h3>
          <label className="btn btn-outline cursor-pointer">
            Select
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) =>
                setPhotos((prev) => [...prev, ...(e.target.files ? Array.from(e.target.files) : [])])
              }
            />
          </label>
        </div>
        {previews.length === 0 ? (
          <p className="text-white/60 text-sm">No photos selected.</p>
        ) : (
          <div className="grid grid-cols-4 gap-2">
            {previews.map((src, i) => (
              <div
                key={i}
                className="relative aspect-square w-full overflow-hidden rounded-lg border border-white/10"
                draggable
                onDragStart={() => handleDragStart(i)}
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(i)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" className="h-full w-full object-contain bg-black/30" />
                <button
                  type="button"
                  onClick={() => removePhoto(i)}
                  className="absolute right-1 top-1 rounded-full bg-red-500 text-white h-6 w-6 text-xs shadow-lg hover:bg-red-600 flex items-center justify-center"
                  aria-label="Remove photo"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <button disabled={loading} className="btn btn-primary">
          {loading ? "Uploading..." : "Upload car"}
        </button>
      </div>
    </form>
  );
}
