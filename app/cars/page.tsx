import Image from "next/image";
import Link from "next/link";
import { getSiteUrl } from "@/lib/siteUrl";
import CarCard from "@/app/components/CarCard";

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

async function getCars(): Promise<Car[]> {
  const base = getSiteUrl();
  try {
    const res = await fetch(`${base}/api/cars`, { cache: "no-store" });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

export const metadata = {
  title: "Cars for Sale | Twin Auto Sale",
  description: "Browse clean-title vehicles for sale at Twin Auto Sale in Fresno. See pricing, mileage, and contact us to schedule a test drive.",
  alternates: { canonical: "/cars" },
  openGraph: {
    title: "Cars for Sale | Twin Auto Sale",
    description: "Clean-title vehicles ready for pickup at Twin Auto Sale. Contact us to see them in person.",
    url: "/cars",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Twin Auto Sale vehicles for sale" }],
  },
};

export default async function CarsForSalePage() {
  const cars = await getCars();
  const hasCars = cars.length > 0;
  const featured = hasCars ? cars[0] : null;

  return (
    <div className="container-xl py-20 space-y-14">
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-brand-900/60 via-ink to-black px-8 py-12 md:px-14 md:py-16 shadow-glow">
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.12),transparent_40%),radial-gradient(circle_at_80%_10%,rgba(239,68,68,0.18),transparent_45%)]" aria-hidden />
        <div className="relative grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
          <div className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/70">Cars for Sale</p>
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-white">Clean-title vehicles, inspected and ready to drive.</h1>
              <p className="text-lg text-white/80 max-w-2xl">
                Every car on this list is detailed, photographed, and ready for you to test drive at our Fresno shop. Twin Auto Sale is ready to help you lock in a viewing slot.
              </p>
            <div className="flex flex-wrap gap-3">
              <a href="tel:+15594439694" className="btn btn-primary">Call (559) 443-9694</a>
              <Link href="/estimate" className="btn btn-outline">Message us</Link>
            </div>
            <div className="flex flex-wrap gap-3 text-sm text-white/80">
              <span className="rounded-xl border border-white/15 bg-white/5 px-3 py-2">Twin Auto Sale</span>
              <span className="rounded-xl border border-white/15 bg-white/5 px-3 py-2">4434 N Blackstone, Fresno, CA 93726</span>
              <span className="rounded-xl border border-white/15 bg-white/5 px-3 py-2">(559) 443-9694</span>
            </div>
            <div className="grid sm:grid-cols-3 gap-4 text-white">
                {[
                { label: "Available now", value: cars.length },
                { label: "Clean titles", value: `${cars.length} / ${cars.length}` },
                { label: "On-site viewing", value: "By appointment" },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/15 bg-white/5 px-4 py-3">
                  <div className="text-2xl font-bold">{item.value}</div>
                  <div className="text-sm text-white/70">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
          {featured ? (
            <div className="relative">
              <CarCard car={featured} featured />
            </div>
          ) : (
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white/80">
              <div className="text-sm uppercase tracking-[0.35em] text-white/60 mb-2">Inventory</div>
              <p className="text-lg">No vehicles listed yet. Call us and we&apos;ll let you know what&apos;s coming in.</p>
            </div>
          )}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-white/60">Inventory</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">Available vehicles</h2>
            <p className="text-white/75 max-w-3xl">See something you like? Call and we&apos;ll have it staged for you to inspect. All units are clean title unless noted.</p>
          </div>
          <a href="tel:+15594439694" className="btn btn-outline">Schedule a test drive</a>
        </div>

        {hasCars ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cars.map((car) => (
              <CarCard key={car._id} car={car} />
            ))}
          </div>
        ) : (
          <div className="card p-6 text-white/80">
            <div className="text-xl font-semibold mb-2">No vehicles listed yet</div>
            <p>Check back soon or call us to ask about incoming inventory.</p>
            <div className="flex gap-3 mt-4">
              <a href="tel:+15594439694" className="btn btn-primary">Call the shop</a>
              <Link href="/estimate" className="btn btn-outline">Message us</Link>
            </div>
          </div>
        )}
      </section>

      <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 via-white/0 to-white/5 p-8 md:p-10">
        <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] items-start">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.35em] text-white/60">Schedule</p>
            <h3 className="text-2xl md:text-3xl font-bold text-white">Book a test drive at Twin Auto Sale</h3>
            <p className="text-white/75">
              Let us know when you want to stop by and we&apos;ll stage the vehicle at the front of the lot with keys ready. Same-day appointments are welcome.
            </p>
            <div className="flex flex-wrap gap-3 text-sm text-white/85">
              <span className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-brand-500" aria-hidden />
                Call: (559) 443-9694
              </span>
              <span className="rounded-xl border border-white/15 bg-white/5 px-3 py-2">4434 N Blackstone, Fresno, CA 93726</span>
              <span className="rounded-xl border border-white/15 bg-white/5 px-3 py-2">Hours: Mon-Sat</span>
            </div>
          </div>
          <div className="space-y-3 rounded-2xl border border-white/15 bg-black/40 p-6">
            <div className="flex items-center justify-between text-white">
              <div>
                <div className="text-sm text-white/70">Quick booking</div>
                <div className="text-xl font-semibold">Pick a time that works</div>
              </div>
              <div className="rounded-full bg-brand-500/20 px-3 py-1 text-sm font-semibold text-brand-100">No fee</div>
            </div>
            <ul className="space-y-2 text-sm text-white/80">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-brand-500" aria-hidden />
                Call or text us with your preferred date and vehicle.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-brand-500" aria-hidden />
                Bring your license and insurance for the test drive.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-brand-500" aria-hidden />
                We can send a walkaround video if you can&apos;t make it in.
              </li>
            </ul>
            <div className="flex flex-wrap gap-3">
              <a href="tel:+15594439694" className="btn btn-primary">Call to schedule</a>
              <Link href="/estimate" className="btn btn-outline">Message for a slot</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-10">
        <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr] items-center">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.35em] text-white/60">Visit us</p>
            <h3 className="text-2xl font-bold text-white">See a vehicle in person at our Fresno shop</h3>
            <p className="text-white/75">
              Call ahead so we can pull the vehicle up front, walk you through the condition, and provide Carfax documents and repair records.
            </p>
            <div className="flex flex-wrap gap-3 text-sm text-white/80">
              <span className="rounded-xl border border-white/15 bg-white/5 px-3 py-2">4434 N Blackstone, Fresno, CA 93726</span>
              <span className="rounded-xl border border-white/15 bg-white/5 px-3 py-2">Showroom hours: Mon-Sat</span>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/40 p-6 space-y-3">
            <div className="flex items-center justify-between text-white">
              <div>
                <div className="text-sm text-white/70">Need financing?</div>
                <div className="text-xl font-semibold">We can work with your bank</div>
              </div>
              <div className="rounded-full bg-brand-500/20 px-3 py-1 text-sm font-semibold text-brand-100">Optional</div>
            </div>
            <p className="text-white/70 text-sm">
              Bring your pre-approval or ask us for a purchase order—most banks accept our documentation. We also accept cashier&apos;s checks and credit union drafts.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="tel:+15594439694" className="btn btn-primary">Call finance desk</a>
              <Link href="/estimate" className="btn btn-outline">Send pre-approval</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
