import EstimateForm from "@/app/components/EstimateForm";
import { getSiteUrl } from "@/lib/siteUrl";

const siteUrl = getSiteUrl();

export const metadata = {
  title: "Free Estimate - Royal Auto Collision",
  description: "Request a fast, free repair estimate. Upload photos and details - we'll respond quickly.",
  keywords: [
    "online collision estimate",
    "free auto body quote",
    "upload car damage photos",
    "insurance repair estimate",
    "Fresno body shop estimate"
  ],
  openGraph: {
    title: "Free Collision Repair Estimate | Royal Auto Collision",
    description: "Upload photos and details to get a fast, no-cost repair estimate from our Fresno collision center.",
    url: `${siteUrl}/estimate`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Royal Auto Collision Estimate" }],
  },
  alternates: { canonical: "/estimate" },
};

export default function EstimatePage() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-ink via-slate-900 to-brand-900/40">
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-10 h-80 w-80 rounded-full bg-brand-700/30 blur-3xl" />
      <div className="container-xl py-24 relative">
        <script
          id="ld-estimate-breadcrumb"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
                { "@type": "ListItem", position: 2, name: "Free Estimate", item: `${siteUrl}/estimate` }
              ]
            })
          }}
        />
        <script
          id="ld-estimate-service"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              name: "Free collision repair estimate",
              serviceType: "Auto body and paint estimate",
              provider: {
                "@type": "AutoBodyShop",
                name: "Royal Auto Collision",
                areaServed: "Fresno, CA"
              },
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
                description: "No-cost photo or in-person estimate for collision repair."
              },
              url: `${siteUrl}/estimate`,
            })
          }}
        />
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Free Estimate</h1>
        <p className="text-white/80 mb-8">Tell us a bit about the vehicle and damage. We'll reach out shortly.</p>
        <EstimateForm />
      </div>
    </section>
  );
}
