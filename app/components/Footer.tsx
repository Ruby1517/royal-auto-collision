export default function Footer(){
  return (
    <footer className="mt-24 border-t border-white/10">
      <div className="container-xl py-10 grid md:grid-cols-3 gap-8 text-white/80">
        <div>
          <div className="text-2xl font-extrabold">Royal Auto Collision</div>
          <p className="mt-2">Premium collision repair & auto body services.</p>
          <div className="mt-4">
            <div className="font-semibold text-white mb-2">Follow Us</div>
            <div className="flex items-center gap-3">
              <a
                href="https://www.tiktok.com/@royal.auto.collis"
                aria-label="TikTok"
                title="TikTok"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-600/50 text-brand-500 hover:text-white hover:bg-brand-600 shadow-glow transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                {/* Simple musical note for TikTok */}
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M14 3v9.28a3.75 3.75 0 1 1-1.5-3V3h1.5c.2 1.6 1.5 3 3.5 3v1.6c-1.8 0-3.2-.6-4.5-1.7V14a5.25 5.25 0 1 1-2.1-4.2V3H14z"/>
                </svg>
              </a>
              <a
                href="https://www.facebook.com/RoyalAutoCollisionFresno"
                aria-label="Facebook"
                title="Facebook"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-600/50 text-brand-500 hover:text-white hover:bg-brand-600 shadow-glow transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M13.5 8H15V6h-1.5c-1.2 0-2 .8-2 2v1H10v2h1.5v7H14v-7h1.7l.3-2H14V8c0-.3.2-.5.5-.5z"/>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/royalautocollision25"
                aria-label="Instagram"
                title="Instagram"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-600/50 text-brand-500 hover:text-white hover:bg-brand-600 shadow-glow transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                {/* Rounded square with circle and dot */}
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <rect x="4" y="4" width="16" height="16" rx="4"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17" cy="7" r="1.4" fill="currentColor" stroke="none"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div>
          <div className="font-semibold text-white mb-2">Visit Us</div>
          <p>2345 W Belmont Ave, Fresno, CA 93728</p>
          <p>Mon–Fri: 7am–4pm </p>
          <p> Sat: 9am–2pm</p>
        </div>
        <div>
          <div className="font-semibold text-white mb-2">Contact</div>
          <p>Phone: (559)286-4750</p>
          <p>Email: royalautocollision25@gmail.com</p>
        </div>
      </div>
      <div className="border-t border-white/10 text-center py-4 text-white/60 text-sm">
        © {new Date().getFullYear()} Royal Auto Collision. All rights reserved.
      </div>
    </footer>
  );
}
