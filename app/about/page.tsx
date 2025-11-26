import Script from "next/script";
import { getSiteUrl } from "@/lib/siteUrl";

export const metadata = {
  title: "About Us - Royal Auto Collision",
  description:
    "Learn about our family-owned collision repair shop in Fresno, CA. OEM repair methods, computer-matched paint, insurance coordination, and lifetime paint warranty.",
  alternates: { canonical: "/about" },
};

const siteUrl = getSiteUrl();

export default function AboutPage() {
  return (
    <>
      {/* Hero with gradient background (no video) */}
      <section className="relative overflow-hidden bg-gradient-to-br from-ink via-slate-900 to-brand-900/40">
        <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -right-10 h-80 w-80 rounded-full bg-brand-700/30 blur-3xl" />
        <div className="container-xl relative py-16 md:py-20">
          <div className="max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/60">About Us</p>
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mt-3">About Royal Auto Collision</h1>
            <p className="text-white/85 mt-4 max-w-2xl">
              Full-service collision center serving Fresno, CA. We restore factory fit and finish using OEM repair methods,
              precision equipment, and streamlined insurance coordination.
            </p>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-br from-ink via-slate-900 to-brand-900/40">
        <div className="container-xl py-24">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6">Our Story</h2>
          <p className="text-white/80 mb-6 max-w-3xl">
            We are a Fresno-based auto body and collision repair center dedicated to restoring your
            vehicle&apos;s safety, performance, and showroom-quality finish. Our team follows
            OEM-approved repair procedures, utilizes precision measuring and frame equipment,
            and applies computer-matched refinishing to achieve a true factory-level result.
          </p>
          <div className="mt-4 flex gap-3 mb-10">
            <a href="/gallery" className="btn btn-primary">View Our Work</a>
            <a href="/estimate" className="btn btn-outline">Get a Free Estimate</a>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <div className="card p-6">
              <h2 className="text-2xl font-semibold mb-2">Our Promise</h2>
              <ul className="space-y-2 text-white/85">
                <li>Clear communication and status updates</li>
                <li>Insurance coordination to save you time</li>
                <li>OEM repair methods and quality parts guidance</li>
                <li>Lifetime paint warranty for as long as you own the vehicle</li>
              </ul>
            </div>
            <div className="card p-6">
              <h2 className="text-2xl font-semibold mb-2">What We Do</h2>
              <ul className="space-y-2 text-white/85">
                <li>Collision and structural repairs</li>
                <li>Bumper, dent, and scratch repair</li>
                <li>Computer color-matched paint and refinishing</li>
                <li>Headlight restoration and glass assistance</li>
              </ul>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="card p-6">
              <h3 className="text-xl font-semibold mb-1">Insurance Friendly</h3>
              <p className="text-white/80">We work with most major insurers and keep you updated from estimate to delivery.</p>
            </div>
            <div className="card p-6">
              <h3 className="text-xl font-semibold mb-1">Factory-Level Finish</h3>
              <p className="text-white/80">OEM repair methods, precise measurements, and paint matched to your VIN/spec.</p>
            </div>
          </div>
        </div>
      </section>

      <Script id="ld-about" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            mainEntity: {
              "@type": "AutoBodyShop",
              name: "Royal Auto Collision",
              url: siteUrl,
              telephone: "+1-559-286-4750",
              address: {
                "@type": "PostalAddress",
                streetAddress: "2345 W Belmont Ave",
                addressLocality: "Fresno",
                addressRegion: "CA",
                postalCode: "93728",
                addressCountry: "US"
              }
            }
          })
        }}
      />
    </>
  );
}
