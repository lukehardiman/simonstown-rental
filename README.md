# Simon's Town Rental

Boutique holiday accommodation website for Simon's Town, Cape Peninsula — built on Payload CMS 3.x + Next.js 15.

## Quick Start

### Prerequisites
- Node.js 20+
- MongoDB (local or Atlas)
- pnpm (recommended) or npm

### Setup

```bash
# Clone and install
git clone [repo-url] simonstown-rental
cd simonstown-rental
pnpm install

# Configure environment
cp .env.example .env
# Edit .env with your MongoDB URI and a secure PAYLOAD_SECRET

# Start development
pnpm dev
```

The site runs at `http://localhost:3000` and the Payload admin at `http://localhost:3000/admin`.

On first visit to `/admin`, you'll be prompted to create your admin user.

---

## Architecture

### Tech Stack
- **CMS**: Payload CMS 3.x (headless, runs inside Next.js)
- **Framework**: Next.js 15 (App Router, React Server Components)
- **Styling**: Tailwind CSS with custom design tokens
- **Database**: MongoDB
- **Deployment**: Vercel (planned)
- **Image optimisation**: Sharp + Next.js Image component
- **SEO**: Payload SEO plugin + JSON-LD structured data

### Project Structure

```
src/
├── app/
│   ├── (frontend)/      # Public-facing pages (Next.js App Router)
│   │   ├── layout.tsx   # Root layout with fonts, metadata, structured data
│   │   └── page.tsx     # Homepage
│   ├── (payload)/       # Payload CMS admin routes (don't touch)
│   └── api/
│       └── enquiry/     # Form submission endpoint
│
├── collections/         # Payload CMS content types
│   ├── Properties.ts    # Rental property listings
│   ├── PropertyImages.ts # Optimised property photo uploads
│   ├── AreaGuide.ts     # Peninsula attractions, restaurants, activities
│   ├── Pages.ts         # Static content (History, Family, etc.)
│   ├── Media.ts         # General site media
│   ├── Enquiries.ts     # Booking form submissions
│   └── Users.ts         # CMS admin users
│
├── globals/
│   └── SiteSettings.ts  # Site-wide config (contact, SEO defaults, etc.)
│
├── components/
│   ├── layout/          # Header, Footer
│   ├── sections/        # Page section components
│   ├── forms/           # EnquiryForm
│   └── ui/              # Buttons, cards, shared UI
│
├── lib/
│   ├── payload.ts       # Data access utilities
│   └── utils.ts         # className merger (cn)
│
├── hooks/               # React hooks (scroll animation, etc.)
├── styles/
│   └── globals.css      # Tailwind + custom CSS
│
└── payload.config.ts    # Main Payload CMS configuration
```

### Collections Overview

| Collection | Purpose | Public | Notes |
|---|---|---|---|
| Properties | Rental listings with gallery, amenities, pricing | ✓ | Core content type |
| Property Images | Optimised uploads with thumbnail/card/hero/OG sizes | ✓ | Auto-generates responsive sizes |
| Area Guide | Peninsula attractions by category & area | ✓ | Dining, nature, history, etc. |
| Pages | Static content pages | ✓ | Supports story/contact/landing templates |
| Media | General site images | ✓ | |
| Enquiries | Booking form submissions | Admin only | Email notification TODO |
| Users | CMS admin accounts | Admin only | |

### Design System

Custom colour palette in `tailwind.config.ts`:
- **Sea** — Primary ocean blue (`sea-500: #2e91a5`)
- **Stone** — Warm neutral backgrounds (`stone-50: #faf8f5`)
- **Fynbos** — Warm terracotta accent (`fynbos-500: #de742d`)
- **Navy** — Deep text colour (`navy-950: #1a2234`)

Typography: Playfair Display (display) + Libre Franklin (body). Fluid type scale using `clamp()`.

---

## Pages to Build

### MVP (Phase 1)
1. **Home** — Hero, property highlight, area teaser, family story teaser, CTA ✅
2. **The House** — Full property detail with gallery, amenities, pricing, map
3. **Area Guide** — Filterable grid of peninsula highlights
4. **History of Simon's Town** — Story-format page with rich text
5. **The Hardiman Family** — Story-format family history page
6. **Contact** — Enquiry form + contact details + map

### Phase 2
- Second property listing
- Enhanced area guide with individual detail pages
- Availability calendar
- Guest reviews/testimonials
- Blog / local journal

---

## Working with Claude Code

### Key Implementation Notes

- All frontend pages live under `src/app/(frontend)/` — Payload admin is at `src/app/(payload)/`
- Use `getPayloadClient()` from `src/lib/payload.ts` for all data fetching in Server Components
- Images use Next.js `<Image>` component — PropertyImages collection auto-generates responsive sizes
- The enquiry form POSTs to `/api/enquiry` which creates a Payload document
- SEO metadata is managed per-page through Payload's SEO plugin fields

### Performance Targets
- Lighthouse Performance: 95+
- LCP: < 2.5s
- CLS: < 0.1
- All images served as AVIF/WebP via Next.js
- Font loading: `display: swap` with preload

---

## Deployment

Target: Vercel + MongoDB Atlas

```bash
# Build
pnpm build

# Environment variables needed in Vercel:
# MONGODB_URI, PAYLOAD_SECRET, NEXT_PUBLIC_SITE_URL
```

---

## Credits

Design & Development: Luke Hardiman
Domain: simonstownrental.com
