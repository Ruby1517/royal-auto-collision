# Royal Auto Collision — Next.js + Tailwind

A modern, fast-loading website for an auto body & collision repair shop.

## Quick Start

```bash
npm install
npm run dev

```

## Tech

- Next.js (App Router) + React 18
- Tailwind CSS
- Optimized SVG logo, responsive components, image placeholders
- Minimal JS on the client = fast page loads

## Pages

- `/` — Home (Hero, Services, Before/After, Testimonials, CTA)
- `/services` — Services grid
- `/gallery` — Gallery placeholders (swap with your real photos)
- `/testimonials` — Testimonials
- `/estimate` — Free Estimate form

## Customize

- **Logo**: `/public/logo.svg` (edit colors or shapes as needed)
- **Colors**: Tailwind theme in `tailwind.config.ts` (brand/gold/ink/steel)
- **Contact & Address**: Update in `components/Footer.tsx`
- **SEO**: `app/layout.tsx` metadata

## Suggested palette

- Primary (brand): `#DC2626` / `#EF4444`
- Accent (gold): `#F59E0B`
- Background (ink): `#0B0F19`
- Surface (white/5) with subtle glassmorphism

## Next steps

- Hook up the Estimate form to your backend, email (Formspree/Mailgun), or database.
- Replace `/public/placeholder.svg` with real images, then set sizes for perfect LCP.
- Add a `robots.txt` and real domain in `metadataBase` once deployed.

Happy shipping!
