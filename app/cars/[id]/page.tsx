import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSiteUrl } from "@/lib/siteUrl";
import CarGallery from "@/app/components/CarGallery";

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

async function fetchCar(id: string): Promise<Car | null> {
  const base = getSiteUrl();
  try {
    const res = await fetch(`${base}/api/cars`, { cache: "no-store" });
    if (!res.ok) return null;
    const cars: Car[] = await res.json();
    return cars.find((c) => c._id === id) || null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const car = await fetchCar(params.id);
  if (!car) {
    return {
      title: "Vehicle not found | Twin Auto Sale",
    };
  }
  return {
    title: `${car.name} | Twin Auto Sale`,
    description: car.description || `View photos and details for ${car.name}. Clean-title vehicle available in Fresno.`,
    alternates: { canonical: `/cars/${params.id}` },
    openGraph: {
      title: `${car.name} | Twin Auto Sale`,
      description: car.description || "Clean-title vehicle available in Fresno.",
      url: `/cars/${params.id}`,
      images: car.photos?.length ? [{ url: car.photos[0], width: 1200, height: 630, alt: car.name }] : undefined,
    },
  };
}

export default async function CarDetailPage({ params }: { params: { id: string } }) {
  const car = await fetchCar(params.id);
  if (!car) return notFound();

  return (
    <div className="container-xl py-20 space-y-10">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-white/60">Vehicle</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">{car.name}</h1>
          <div className="mt-2 flex flex-wrap gap-2 text-sm text-white/70">
            {car.price && <span className="rounded-full border border-white/15 px-3 py-1">{car.price}</span>}
            {car.mileage && <span className="rounded-full border border-white/15 px-3 py-1">{car.mileage}</span>}
            {car.drivetrain && <span className="rounded-full border border-white/15 px-3 py-1">{car.drivetrain}</span>}
            {car.color && <span className="rounded-full border border-white/15 px-3 py-1">{car.color}</span>}
          </div>
        </div>
        <div className="flex gap-3">
          <a href="tel:+15594439694" className="btn btn-primary">Call about this car</a>
          <Link href="/estimate" className="btn btn-outline">Request info</Link>
        </div>
      </div>

      <CarGallery photos={car.photos} name={car.name} />

      <div className="grid gap-6 md:grid-cols-[1fr_0.8fr] items-start">
        <div className="card p-6 space-y-3">
          <h2 className="text-2xl font-semibold text-white">Overview</h2>
          <p className="text-white/80">{car.description || "Clean-title vehicle available for viewing at our Fresno location."}</p>
          {car.highlights?.length ? (
            <div className="grid sm:grid-cols-2 gap-2 text-sm text-white/85">
              {car.highlights.map((item) => (
                <div key={item} className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                  <span className="h-2 w-2 rounded-full bg-brand-500" aria-hidden />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          ) : null}
        </div>

        <div className="card p-6 space-y-4">
          <h3 className="text-xl font-semibold text-white">Visit & Contact</h3>
          <div className="space-y-2 text-white/80 text-sm">
            <div>4434 N Blackstone, Fresno, CA 93726</div>
            <div>Call: (559) 443-9694</div>
            <div>Hours: Mon-Sat</div>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="tel:+15594439694" className="btn btn-primary">Schedule a viewing</a>
            <Link href="/estimate" className="btn btn-outline">Message us</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
