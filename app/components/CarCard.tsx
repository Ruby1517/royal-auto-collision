"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export type CarItem = {
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

type Props = {
  car: CarItem;
  featured?: boolean;
};

export default function CarCard({ car, featured = false }: Props) {
  const photos = (car.photos || []).filter(Boolean);
  const [active, setActive] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const hasPhotos = photos.length > 0;
  const main = hasPhotos ? photos[Math.min(active, photos.length - 1)] : "/og.png";
  const priceLabel = car.price
    ? car.price.trim().startsWith("$")
      ? car.price.trim()
      : `$${car.price.trim()}`
    : "Call for price";

  const prev = () => setActive((idx) => (idx - 1 + photos.length) % photos.length);
  const next = () => setActive((idx) => (idx + 1) % photos.length);

  return (
    <article className={`card overflow-hidden border border-white/10 bg-white/5 ${featured ? "p-2" : ""}`}>
      <div className="relative block cursor-pointer" onClick={() => setShowModal(true)}>
        <div className="relative overflow-hidden rounded-2xl bg-black/60">
          {hasPhotos && (
            <>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-white border border-white/20 hover:bg-black/85"
                aria-label="Previous photo"
              >
                {"<"}
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-white border border-white/20 hover:bg-black/85"
                aria-label="Next photo"
              >
                {">"}
              </button>
            </>
          )}
          <Image
            src={main}
            alt={car.name}
            width={1400}
            height={900}
            className="w-full h-56 object-cover bg-black/60"
            priority={featured}
          />
          <div className="absolute bottom-3 right-3 rounded-full bg-brand-500/90 px-4 py-2 text-sm font-bold text-white shadow-lg">
            {priceLabel}
          </div>
        </div>
      </div>

      {photos.length > 1 ? (
        <div className="px-5 pt-3 flex gap-3 overflow-x-auto pb-3">
          {photos.slice(0, 6).map((photo, idx) => (
            <button
              type="button"
              key={`${photo}-${idx}`}
              onClick={(e) => { e.preventDefault(); setActive(idx); }}
              className={`h-12 w-12 shrink-0 overflow-hidden rounded-md border bg-black/60 transition hover:scale-110 ${
                idx === active
                  ? "border-brand-400 ring-2 ring-brand-300/60 shadow-glow"
                  : "border-white/15 hover:border-white/40"
              }`}
              aria-label={`View photo ${idx + 1}`}
            >
              <Image
                src={photo}
                alt={`${car.name} thumb ${idx + 1}`}
                width={160}
                height={160}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      ) : null}

      <div className="p-3 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-xs uppercase text-white/60">{car.color || "Available"}</div>
            <div className="text-xl font-semibold text-white">{car.name}</div>
          </div>
          {car.vin ? (
            <div className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/80">
              VIN ending {car.vin.slice(-6)}
            </div>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-2 text-sm text-white/75">
          {car.mileage && <span className="rounded-full border border-white/15 px-3 py-1">{car.mileage}</span>}
          {car.drivetrain && <span className="rounded-full border border-white/15 px-3 py-1">{car.drivetrain}</span>}
          {car.location && <span className="rounded-full border border-white/15 px-3 py-1">{car.location}</span>}
        </div>
        {car.highlights?.length ? (
          <div className="grid grid-cols-2 gap-2 text-sm text-white/80">
            {car.highlights.slice(0, 4).map((item) => (
              <div key={item} className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                <span className="h-2 w-2 rounded-full bg-brand-500" aria-hidden />
                <span>{item}</span>
              </div>
            ))}
          </div>
        ) : null}
        <div className="flex flex-wrap gap-3">
          <a href="tel:+15594439694" className="btn btn-primary">Call about this car</a>
          <Link href={`/cars/${car._id}`} className="btn btn-outline">View details</Link>
        </div>
      </div>

      {showModal ? (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/85 p-3 md:p-6"
          onClick={() => setShowModal(false)}
        >
          <div
            className="relative w-full max-w-[90vw] max-h-[90vh] bg-ink rounded-2xl border border-white/10 shadow-[0_10px_60px_rgba(0,0,0,0.7)] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/80 text-white border border-white/20 hover:bg-black/90"
              aria-label="Close"
            >
              ✕
            </button>
            <div className="relative">
              {hasPhotos && (
                <>
                  <button
                    type="button"
                    onClick={prev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/80 text-white border border-white/20 hover:bg-black/90"
                    aria-label="Previous photo"
                  >
                    {"<"}
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/80 text-white border border-white/20 hover:bg-black/90"
                    aria-label="Next photo"
                  >
                    {">"}
                  </button>
                </>
              )}
              <Image
                src={main}
                alt={car.name}
                width={1600}
                height={1200}
                className="w-full max-h-[75vh] object-contain bg-black"
              />
            </div>
            {photos.length > 1 ? (
              <div className="px-4 py-3 flex gap-3 overflow-x-auto bg-black/60">
                {photos.map((photo, idx) => (
                  <button
                    key={`${photo}-${idx}`}
                    type="button"
                    onClick={() => setActive(idx)}
                    className={`h-16 w-24 shrink-0 overflow-hidden rounded-lg border bg-black/60 transition ${
                      idx === active ? "border-brand-400 shadow-glow" : "border-white/15 hover:border-white/40"
                    }`}
                    aria-label={`View photo ${idx + 1}`}
                  >
                    <Image
                      src={photo}
                      alt={`${car.name} thumb ${idx + 1}`}
                      width={240}
                      height={160}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </article>
  );
}
