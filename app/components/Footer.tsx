export default function Footer(){
  return (
    <footer className="mt-24 border-t border-white/10">
      <div className="container-xl py-10 grid md:grid-cols-3 gap-8 text-white/80">
        <div>
          <div className="text-2xl font-extrabold">Royal Auto Collision</div>
          <p className="mt-2">Premium collision repair & auto body services.</p>
          <div className="mt-4">
            <div className="font-semibold text-white mb-2">Follow Us</div>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://www.tiktok.com/@royal.auto.collis"
                aria-label="TikTok"
                title="TikTok"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-600/50 text-brand-500 hover:text-white hover:bg-brand-600 shadow-glow transition"
                target="_blank"
                rel="noopener noreferrer"
              >
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
                href="https://www.instagram.com/royalautocollisionfresno"
                aria-label="Instagram"
                title="Instagram"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-600/50 text-brand-500 hover:text-white hover:bg-brand-600 shadow-glow transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <rect x="4" y="4" width="16" height="16" rx="4"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17" cy="7" r="1.4" fill="currentColor" stroke="none"/>
                </svg>
              </a>
              <a
                href="https://share.google/8W7OfyHSr0rVMYNFI"
                aria-label="Google Maps"
                title="Google Maps"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-600/50 text-brand-500 hover:text-white hover:bg-brand-600 shadow-glow transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <path d="M12 3c3 0 5.5 2.3 5.5 5.4 0 3.7-3.7 7.6-5.2 9.2-.2.2-.4.2-.6 0-1.5-1.6-5.2-5.5-5.2-9.2C6.5 5.3 9 3 12 3Z"/>
                  <circle cx="12" cy="8.4" r="2.2" />
                </svg>
              </a>
              <a
                href="https://www.yelp.com/biz/royal-auto-collision-fresno"
                aria-label="Yelp"
                title="Yelp"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-600/50 text-brand-500 hover:text-white hover:bg-brand-600 shadow-glow transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M11.4 3.1c-.5-.4-1.3-.1-1.4.6L9.3 8.4c-.1.5.2 1 .7 1.1l2.7.6c.8.2 1.5-.6 1.2-1.4l-2.5-5.5ZM7.4 12.5l-4.1-1c-.7-.2-1.3.5-1 .1l2.6 3.2c.3.4.9.4 1.3.1l1.8-1.5c.6-.5.4-1.5-.4-1.7ZM12.1 12.8c-.4-.2-.9-.1-1.2.2l-2.5 2.4c-.5.5-.3 1.4.4 1.6l3.2.9c.5.2 1-.1 1.1-.6l.8-3.3c.1-.5-.1-1-.5-1.2ZM14.4 4.6c0 .6.4 1.1.9 1.3l3 .9c.6.2 1.2-.3 1.1-.9l-.3-3.1c-.1-.6-.7-1-.1.4L14.8 3c-.3.1-.4.4-.4.6ZM18.2 10.7l-2.5.5c-.6.1-1 .7-.9 1.3l.8 3.5c.1.7.9 1.1 1.5.7l2.7-1.7c.5-.3.6-1 .2-1.4l-3.4-2.9Z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div>
          <div className="font-semibold text-white mb-2">Visit Us</div>
          <p>2345 W Belmont Ave, Fresno, CA 93728</p>
          <p>Mon-Fri: 7am-4pm</p>
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
