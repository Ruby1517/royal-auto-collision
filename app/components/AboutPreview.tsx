import Link from "next/link";

export default function AboutPreview() {
  return (
    <section className="container-xl py-16">
      <div className="grid md:grid-cols-12 gap-8 items-start">
        <div className="md:col-span-7">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">About Royal Auto Collision</h2>
          <p className="text-white/80 mb-4">
            Family‑owned collision center serving Fresno, CA. Our technicians restore factory fit
            and finish using OEM procedures, precision frame equipment, and computer‑matched paint.
          </p>
          <p className="text-white/80 mb-6">
            We work with your insurance, keep you updated, and stand behind our work with a
            lifetime paint warranty for as long as you own your vehicle.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/about" className="btn btn-primary">Read Our Story</Link>
            <Link href="/estimate" className="btn btn-outline">Get a Free Estimate</Link>
          </div>
        </div>
        <div className="md:col-span-5">
          <div className="card p-6">
            <h3 className="text-xl font-semibold mb-3">Why Drivers Choose Us</h3>
            <ul className="space-y-2 text-white/85">
              <li>• OEM repair methods and parts guidance</li>
              <li>• Computer color‑matched refinishing</li>
              <li>• Insurance coordination and status updates</li>
              <li>• Lifetime paint warranty</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

