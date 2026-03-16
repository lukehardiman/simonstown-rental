# CLAUDE.md — Project Intelligence for Claude Code

## What is this project?

A boutique holiday rental website for a family property in Simon's Town, Cape Peninsula, South Africa. Built on Payload CMS 3.x running inside Next.js 15 App Router. Currently one property; designed to scale to two.

**Lead**: Luke Hardiman — 25+ years web experience, front-end/UX specialist. Based in the UK, property is in South Africa.

**Domain**: simonstownrental.com

---

## Architecture Decisions

- **Payload 3.x** chosen over WordPress/Sanity because: runs natively inside Next.js (no separate server), typed collections, scales to multi-property without rearchitecting
- **MongoDB** for the database (Payload 3 default)
- **Next.js App Router** with React Server Components for data fetching — no client-side data fetching except forms
- **Tailwind CSS** with a custom design token system (see `tailwind.config.ts`) — no component library
- **No booking engine yet** — Phase 1 is presentation + enquiry form. Calendar/payments come later.

## Code Conventions

- TypeScript strict mode throughout
- Payload collections in `src/collections/`, one file per collection
- Frontend pages in `src/app/(frontend)/` (route group — Payload admin uses `(payload)`)
- Data access through `src/lib/payload.ts` helper functions
- Components: `src/components/{layout,sections,forms,ui}/`
- Use `cn()` from `src/lib/utils.ts` for conditional classNames
- Fluid typography: use `text-fluid-*` utilities, not fixed sizes
- Spacing: use `section-padding` / `section-padding-sm` for vertical rhythm
- Containers: `container-site` (72rem max) or `container-narrow` (48rem max)

## Design Language

The visual identity is coastal, warm, and editorial — not generic holiday-rental. Think boutique hotel website meets family-run authenticity.

- **Fonts**: Playfair Display (display headings) + Libre Franklin (body)
- **Palette**: Sea blues, warm stone, fynbos terracotta accent, deep navy text
- **Tone**: Confident but warm. Not overly salesy. Local knowledge is the USP.
- **Imagery**: When placeholders need replacing, images should feel documentary/editorial, not stock-photo polished
- **Motion**: Subtle scroll-reveal animations. No parallax. No jarring transitions.

## SEO Strategy

- Every public collection uses the `@payloadcms/plugin-seo` fields
- JSON-LD structured data on homepage (LodgingBusiness) and property pages (VacationRental)
- Target keywords: "Simon's Town accommodation", "Cape Peninsula holiday rental", "self-catering Simon's Town"
- Long-stay audience (UK/European winter escapees, remote workers)
- Area Guide content is the SEO growth engine — each entry is a potential landing page

## Key Files

| File | What it does |
|---|---|
| `src/payload.config.ts` | Main CMS config — all collections, globals, plugins |
| `src/collections/Properties.ts` | The primary content type — property with gallery, amenities, pricing |
| `src/collections/AreaGuide.ts` | Peninsula attractions categorised by type and area |
| `src/app/(frontend)/layout.tsx` | Root layout with fonts, viewport meta, structured data |
| `src/app/(frontend)/page.tsx` | Homepage |
| `src/components/forms/EnquiryForm.tsx` | Booking enquiry form (React Hook Form) |
| `src/lib/payload.ts` | Data access helpers for Server Components |
| `src/styles/globals.css` | Global styles, Tailwind layers, component classes |
| `tailwind.config.ts` | Custom colours, fluid type scale, animations |

## Common Tasks

### Adding a new page
1. Create route in `src/app/(frontend)/[slug]/page.tsx`
2. Use `getPageBySlug()` from `src/lib/payload.ts` to fetch content
3. Apply metadata from Payload SEO fields
4. Wrap in `<Header />` and `<Footer />`

### Adding a new area guide category
1. Add option to `category` select in `src/collections/AreaGuide.ts`
2. Update filter UI on the area guide listing page

### Working with images
- Property images go through `PropertyImages` collection (auto-generates sizes: thumbnail 400w, card 800w, hero 1920w, og 1200x630)
- General images use `Media` collection
- Always use Next.js `<Image>` with proper `sizes` and `alt`

## What NOT to do

- Don't use client-side data fetching (`useEffect` + fetch) for page content — use RSC
- Don't add a booking/payment system yet — that's Phase 2
- Don't use generic component libraries (shadcn, etc.) — the design is bespoke
- Don't install analytics scripts without discussing privacy implications first (South African POPIA + UK visitor GDPR)
