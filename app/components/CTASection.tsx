import Link from "next/link";

export default function CTASection(){
  return (
    <section className="py-20">
      <div className="container-xl card p-10 text-center">
        <h3 className="text-2xl md:text-3xl font-extrabold">Ready for a Free Estimate?</h3>
        <p className="text-white/80 mt-2">Upload photos or swing by — we’ll guide you every step.</p>
        <div className="mt-6">
          <Link href="/estimate" className="btn btn-primary">Start Your Estimate</Link>
        </div>
      </div>
    </section>
  );
}
