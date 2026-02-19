import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { getSiteUrl } from "@/lib/siteUrl";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Royal Auto Collision - Collision Repair & Body Shop",
    template: "%s - Royal Auto Collision"
  },
  description:
    "Premium auto body & collision repair in Fresno, CA. Free estimate, fast turnaround, OEM-matched paint, and insurance handling.",
  keywords: [
    "auto body shop",
    "collision repair",
    "paint and body",
    "dent repair",
    "bumper repair",
    "Fresno auto body",
    "insurance repair"
  ],
  alternates: {
    canonical: "/"
  },
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    title: "Royal Auto Collision",
    description:
      "Premium auto body & collision repair in Fresno, CA. Free estimate, fast turnaround, OEM-matched paint, and insurance handling.",
    url: siteUrl,
    siteName: "Royal Auto Collision",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Royal Auto Collision - Collision repair in Fresno, CA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Royal Auto Collision",
    description:
      "Premium auto body & collision repair in Fresno, CA. Free estimate, fast turnaround, OEM-matched paint, and insurance handling.",
    images: ["/opengraph-image"],
  },
  icons: {
    icon: "/og.png",
    shortcut: "/og.png",
    apple: "/og.png",
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <script
          id="ld-localbusiness"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "AutoBodyShop",
              name: "Royal Auto Collision",
              url: siteUrl,
              image: `${siteUrl}/og.png`,
              address: {
                "@type": "PostalAddress",
                streetAddress: "2345 W Belmont Ave",
                addressLocality: "Fresno",
                addressRegion: "CA",
                postalCode: "93728",
                addressCountry: "US"
              },
              telephone: "+1-559-286-4750",
              openingHours: [
                "Mo-Fr 07:00-16:00",
                "Sa 09:00-14:00"
              ],
              priceRange: "$$",
              sameAs: [
                "https://www.tiktok.com/@royal.auto.collis",
                "https://www.instagram.com/royalautocollisionfresno",
              ],
            }),
          }}
        />
        <Navbar />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
