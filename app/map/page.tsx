export const metadata = {
  title: "Location & Map — Royal Auto Collision",
  description: "Find our auto body shop in Fresno, CA. Hours, phone, and directions.",
  alternates: { canonical: "/map" },
};

function buildEmbedSrc() {
  const query = process.env.NEXT_PUBLIC_MAP_QUERY || "2345 W Belmont Ave, Fresno, CA 93728";
  const url = `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
  return url;
}

export default function MapPage() {
  const src = buildEmbedSrc();
  const mapsQuery = process.env.NEXT_PUBLIC_MAP_QUERY || "2345 W Belmont Ave, Fresno, CA 93728";
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery)}`;
  return (
    <div className="container-xl py-24">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-8">Find Us</h1>
      <div className="grid md:grid-cols-5 gap-6 items-start">
        {/* Map */}
        <div className="md:col-span-3 card overflow-hidden md:order-2">
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <iframe
              title="Google Map"
              src={src}
              className="absolute inset-0 w-full h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* Contact Details */}
        <div className="md:col-span-2 md:order-1 card p-6">
          <div className="text-2xl font-extrabold mb-2">Royal Auto Collision</div>
          <div className="space-y-4 text-white/90">
            <div>
              <div className="text-white/60 text-sm uppercase">Address</div>
              <div>2345 W Belmont Ave, Fresno, CA 93728</div>
            </div>
            <div>
              <div className="text-white/60 text-sm uppercase">Hours</div>
              <div>Mon–Fri: 7am–4pm</div>
              <div>Sat: 9am–2pm</div>
            </div>
            <div>
              <div className="text-white/60 text-sm uppercase">Contact</div>
              <div>Phone: <a className="underline hover:text-white" href="tel:+15592864750">(559)286-4750</a></div>
              <div>Email: <a className="underline hover:text-white" href="mailto:royalautocollision25@gmail.com">royalautocollision25@gmail.com</a></div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary text-center">Google Maps</a>
            <a href="tel:+15592864750" className="btn btn-outline text-center" aria-label="Call Royal Auto Collision at (559) 286-4750">Call Now</a>
            <a href="sms:+15592864750" className="btn btn-outline text-center" aria-label="Text Royal Auto Collision at (559) 286-4750">Text Us</a>
          </div>

        </div>
      </div>
    </div>
  );
}
