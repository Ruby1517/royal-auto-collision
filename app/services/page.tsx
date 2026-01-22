export const metadata = {
  title: "Services — Royal Auto Collision",
  description:
    "Collision repair, paint & refinish, dent and bumper repair, glass, and insurance handling in Fresno, CA.",
  alternates: { canonical: "/services" },
};


export default function ServicesPage(){
  const items = [
    { title: "Collision Repair", desc: "From minor dents to frame straightening with OEM specs." },
    { title: "Paint & Refinish", desc: "Computer color-matched, dust-free booths, lifetime warranty." },
    { title: "Dent Repair", desc: "Paintless dent removal where applicable, fast and affordable." },
    { title: "Bumper Repair", desc: "Cracks, scuffs, sensors — we restore safety and looks." },
    { title: "Glass & Headlights", desc: "Headlight restoration / replacement, windshield service." },
    { title: "Insurance Handling", desc: "Direct insurance coordination to save you time." }
  ];
  return (
    <div className="container-xl py-24">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-10">Our Services</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((it) => (
          <div key={it.title} className="card p-6">
            <h3 className="text-xl font-semibold">{it.title}</h3>
            <p className="text-white/80 mt-2">{it.desc}</p>
          </div>
        ))}
      </div>
      <script
        id="ld-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Do you work with my insurance?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. We coordinate directly with most major insurers to streamline approvals and keep you updated."
                }
              },
              {
                "@type": "Question",
                name: "How long do repairs take?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Minor repairs can be done in a few days, while collision repairs vary by parts availability and damage. We provide timelines up front."
                }
              },
              {
                "@type": "Question",
                name: "Is your paint work guaranteed?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Paint is computer color-matched and performed in controlled booths. We offer a lifetime warranty on paint for as long as you own the vehicle."
                }
              }
            ]
          })
        }}
      />
    </div>
  );
}
