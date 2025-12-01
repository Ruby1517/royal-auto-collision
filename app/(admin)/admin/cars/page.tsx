"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { clearAdminToken, getAdminToken } from "@/lib/clientAuth";
import UploadCar from "@/app/components/admin/UploadCar";

type Admin = { email: string; role: "admin" | "user" };
type Car = {
  _id: string;
  name: string;
  price?: string;
  mileage?: string;
  drivetrain?: string;
  color?: string;
  vin?: string;
  location?: string;
  description?: string;
  highlights?: string[];
  photos: string[];
};

export default function AdminCarsPage() {
  const router = useRouter();
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [loading, setLoading] = useState(true);
  const [cars, setCars] = useState<Car[]>([]);
  const [editing, setEditing] = useState<Car | null>(null);
  const [saving, setSaving] = useState(false);
  const [photoUploading, setPhotoUploading] = useState(false);

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

  async function loadCars() {
    try {
      const token = getAdminToken();
      if (!token) return router.replace("/admin/login");
      const res = await fetch("/api/cars", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to load cars");
      const data = await res.json();
      setCars(Array.isArray(data) ? data : []);
    } catch {
      setCars([]);
    }
  }

  useEffect(() => {
    loadCars();
  }, []);

  async function deleteCar(id: string) {
    if (!confirm("Delete this car?")) return;
    const token = getAdminToken();
    if (!token) return router.replace("/admin/login");
    const res = await fetch(`/api/cars/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) loadCars();
    else alert("Delete failed");
  }

  async function saveCar() {
    if (!editing) return;
    const token = getAdminToken();
    if (!token) return router.replace("/admin/login");
    setSaving(true);
    const res = await fetch(`/api/cars/${editing._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        name: editing.name,
        price: editing.price,
        mileage: editing.mileage,
        drivetrain: editing.drivetrain,
        color: editing.color,
        vin: editing.vin,
        location: editing.location,
        description: editing.description,
        highlights: editing.highlights || [],
        photos: editing.photos || [],
      }),
    });
    setSaving(false);
    if (res.ok) {
      setEditing(null);
      loadCars();
    } else {
      alert("Save failed");
    }
  }

  async function uploadPhotos(files: FileList | null) {
    if (!editing || !files || files.length === 0) return;
    const token = getAdminToken();
    if (!token) return router.replace("/admin/login");
    setPhotoUploading(true);
    try {
      const form = new FormData();
      Array.from(files).forEach((file) => form.append("photos", file));
      const res = await fetch("/api/upload", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Upload failed");
      const photoUrls: string[] = data.photoUrls || [];
      if (photoUrls.length === 0) return;
      setEditing((prev) => prev ? { ...prev, photos: [...(prev.photos || []), ...photoUrls] } : prev);
    } catch (err: any) {
      alert(err.message || "Upload failed");
    } finally {
      setPhotoUploading(false);
    }
  }

  function removeEditingPhoto(idx: number) {
    if (!editing) return;
    setEditing({ ...editing, photos: (editing.photos || []).filter((_, i) => i !== idx) });
  }

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="container-xl py-10 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Upload car for sale</h1>
          <p className="text-white/70">Photos and details will appear on the Cars for Sale page.</p>
        </div>
        <button
          className="btn btn-outline"
          onClick={() => router.push("/admin/dashboard")}
        >
          Back to Dashboard
        </button>
      </div>

      <div className="card p-6">
        <UploadCar />
      </div>

      <div className="card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Existing cars</h2>
          <button className="btn btn-outline text-sm" onClick={loadCars}>Refresh</button>
        </div>
        {cars.length === 0 ? (
          <div className="text-white/70">No cars listed.</div>
        ) : (
          <div className="grid gap-4">
            {cars.map((car) => (
              <div key={car._id} className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-2">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-sm uppercase text-white/60">Name</div>
                    <div className="text-lg font-semibold text-white">{car.name}</div>
                    <div className="text-white/70 text-sm">{car.price || "Call for price"}</div>
                  </div>
                  <div className="flex gap-2">
                    <button className="btn btn-outline text-sm" onClick={() => setEditing(car)}>Edit</button>
                    <button className="btn btn-outline text-sm" onClick={() => deleteCar(car._id)}>Delete</button>
                  </div>
                </div>
                <div className="flex gap-2 text-xs text-white/70 flex-wrap">
                  {car.mileage && <span className="rounded-full border border-white/15 px-2 py-1">{car.mileage}</span>}
                  {car.drivetrain && <span className="rounded-full border border-white/15 px-2 py-1">{car.drivetrain}</span>}
                  {car.color && <span className="rounded-full border border-white/15 px-2 py-1">{car.color}</span>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {editing && (
        <div className="card p-6 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Edit car</h3>
            <button className="text-white/70 text-sm" onClick={() => setEditing(null)}>Close</button>
          </div>
          {[
            ["name", "Name"],
            ["price", "Price"],
            ["mileage", "Mileage"],
            ["drivetrain", "Drivetrain"],
            ["color", "Color"],
            ["vin", "VIN"],
            ["location", "Location"],
            ["description", "Description"],
          ].map(([key, label]) => (
            <div key={key}>
              <label className="block text-sm mb-1">{label}</label>
              <input
                className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2"
                value={(editing as any)[key] || ""}
                onChange={(e) => setEditing({ ...editing, [key]: e.target.value })}
              />
            </div>
          ))}
          <div>
            <label className="block text-sm mb-1">Highlights (comma separated)</label>
            <input
              className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2"
              value={(editing.highlights || []).join(", ")}
              onChange={(e) => setEditing({ ...editing, highlights: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })}
            />
          </div>
          {editing.photos?.length ? (
            <div className="space-y-2">
              <div className="text-sm text-white/70">Current photos</div>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {editing.photos.map((url, idx) => (
                  <div key={url} className="relative h-24 w-32 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-black/40">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={url} alt="" className="h-full w-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeEditingPhoto(idx)}
                      className="absolute top-1 right-1 h-7 w-7 rounded-full bg-red-500 text-white text-xs font-bold shadow hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
          <div className="flex items-center gap-3">
            <label className="btn btn-outline cursor-pointer">
              {photoUploading ? "Uploading..." : "Add photos"}
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => uploadPhotos(e.target.files)}
                disabled={photoUploading}
              />
            </label>
            <span className="text-sm text-white/60">Uploads append to the list above.</span>
          </div>
          <div className="flex gap-2">
            <button className="btn btn-primary" onClick={saveCar} disabled={saving}>{saving ? "Saving..." : "Save"}</button>
            <button className="btn btn-outline" onClick={() => setEditing(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
