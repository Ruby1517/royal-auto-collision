import Hero from "@/app/components/Hero";
import ServiceCards from "@/app/components/ServiceCards";
import BeforeAfter from "@/app/components/BeforeAfter";
import MapPreview from "@/app/components/MapPreview";
import Testimonials from "@/app/components/Testimonials";
import CTASection from "@/app/components/CTASection";
import { getSiteUrl } from "@/lib/siteUrl";

const siteUrl = getSiteUrl();

export default function HomePage() {
  return (
    <>
      <script
        id="ld-website"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Royal Auto Collision",
            url: siteUrl
          })
        }}
      />
      <script
        id="ld-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: siteUrl
              }
            ]
          })
        }}
      />
      <Hero />
      <section id="services" className="container-xl py-20">
        <ServiceCards />
      </section>
      <section id="work" className="container-xl py-20">
        <BeforeAfter />
      </section>
      {/* Find Us section after Before & After */}
      <MapPreview />
      <section id="testimonials" className="container-xl py-20">
        <Testimonials />
      </section>
      <CTASection />
    </>
  );
}

export const metadata = {
  title: "Royal Auto Collision - Collision Repair & Body Shop",
  description: "Auto body and collision repair in Fresno, CA. Free estimates, fast turnaround, OEM paint match, and insurance assistance.",
  keywords: [
    "auto body shop Fresno",
    "collision repair Fresno",
    "car paint and body",
    "dent repair near me",
    "insurance auto body repair",
    "free collision estimate"
  ],
  openGraph: {
    title: "Royal Auto Collision - Collision Repair & Body Shop",
    description: "Trusted Fresno collision center offering OEM-grade paint match, frame repair, and insurance-friendly estimates.",
    url: "/",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Royal Auto Collision" }],
  },
  alternates: { canonical: "/" },
};
