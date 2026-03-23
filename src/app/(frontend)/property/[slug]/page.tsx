import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { RichText } from '@payloadcms/richtext-lexical/react'

import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { GalleryWithLightbox } from '@/components/ui/Lightbox'
import type { LightboxImage } from '@/components/ui/Lightbox'
import { getPropertyBySlug, getProperties } from '@/lib/payload'
import type { Media, PropertyImage } from '@/payload-types'

// ── Types ─────────────────────────────────────────────────────────────────────

type Props = {
  params: Promise<{ slug: string }>
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function isMedia(v: string | Media | null | undefined): v is Media {
  return typeof v === 'object' && v !== null
}

function isPropertyImage(v: string | PropertyImage | null | undefined): v is PropertyImage {
  return typeof v === 'object' && v !== null
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

const formatZAR = (amount: number) =>
  new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
    maximumFractionDigits: 0,
  }).format(amount)

// ── Amenity labels ────────────────────────────────────────────────────────────

const AMENITY_LABELS: Record<string, string> = {
  wifi: 'Wi-Fi',
  aircon: 'Air Conditioning',
  fireplace: 'Fireplace',
  braai: 'Braai / BBQ',
  garden: 'Garden',
  'mountain-views': 'Mountain Views',
  'harbour-views': 'Harbour Views',
  parking: 'Secure Parking',
  'washing-machine': 'Washing Machine',
  dishwasher: 'Dishwasher',
  pool: 'Swimming Pool',
  'pet-friendly': 'Pet Friendly',
  'child-friendly': 'Child Friendly',
  'self-catering': 'Full Kitchen',
  'beach-towels': 'Beach Towels',
  tv: 'DStv / Streaming',
  alarm: 'Alarm System',
  loadshedding: 'Load-shedding Backup',
}

// ── Static params ─────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  const properties = await getProperties()
  return properties.map((p) => ({ slug: p.slug }))
}

// ── Metadata ──────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const property = await getPropertyBySlug(slug)
  if (!property) return {}

  const title = property.meta?.title ?? property.title
  const description = property.meta?.description ?? property.excerpt ?? undefined

  const rawMetaImage = property.meta?.image as string | Media | null | undefined
  const ogImageUrl = isMedia(rawMetaImage)
    ? rawMetaImage.url
    : isMedia(property.heroImage)
      ? property.heroImage.url
      : undefined

  return {
    title,
    description,
    alternates: { canonical: `/property/${slug}` },
    openGraph: {
      title: title ?? undefined,
      description: description,
      ...(ogImageUrl && { images: [{ url: ogImageUrl }] }),
    },
  }
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function PropertyPage({ params }: Props) {
  const { slug } = await params
  const property = await getPropertyBySlug(slug)
  if (!property) notFound()

  const hero = isMedia(property.heroImage) ? property.heroImage : null
  const { details, amenities, pricing, location } = property
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://simonstownrental.com'

  // ── JSON-LD ────────────────────────────────────────────────────────────────

  const galleryImageUrls = (property.gallery ?? [])
    .map((g) => {
      const img = isPropertyImage(g.image) ? g.image : null
      return img?.url ?? img?.sizes?.hero?.url ?? null
    })
    .filter((url): url is string => Boolean(url))

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'VacationRental',
    name: property.title,
    description: property.excerpt ?? undefined,
    url: `${siteUrl}/property/${property.slug}`,
    ...(hero?.url && {
      image: [hero.url, ...galleryImageUrls],
    }),
    address: {
      '@type': 'PostalAddress',
      streetAddress: location?.address ?? undefined,
      addressLocality: "Simon's Town",
      addressRegion: 'Western Cape',
      postalCode: '7995',
      addressCountry: 'ZA',
    },
    geo: location?.latitude && location?.longitude
      ? {
          '@type': 'GeoCoordinates',
          latitude: location.latitude,
          longitude: location.longitude,
        }
      : undefined,
    numberOfRooms: details.bedrooms,
    occupancy: {
      '@type': 'QuantitativeValue',
      maxValue: details.sleeps,
    },
    amenityFeature: (amenities ?? []).map((a) => ({
      '@type': 'LocationFeatureSpecification',
      name: AMENITY_LABELS[a] ?? a,
      value: true,
    })),
    ...(pricing?.nightlyRate && {
      priceRange: `From ${formatZAR(pricing.nightlyRate)} per night`,
    }),
  }

  // ── Gallery images (resolved server-side, passed to client component) ────────
  // Exclude any gallery item that is the same image as the hero to avoid duplication.

  const heroId = hero?.id
  const galleryImages: LightboxImage[] = (property.gallery ?? [])
    .filter((item) => {
      const img = isPropertyImage(item.image) ? item.image : null
      return !heroId || !img || img.id !== heroId
    })
    .map((item, i) => {
      const img = isPropertyImage(item.image) ? item.image : null
      const src = img?.url ?? img?.sizes?.card?.url
      if (!src) return null
      return {
        src,
        fullSrc: img?.url ?? img?.sizes?.hero?.url ?? src,
        alt: item.caption ?? img?.alt ?? property.title,
        caption: item.caption ?? undefined,
        isFeature: i === 0,
      }
    })
    .filter(Boolean) as LightboxImage[]

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <>
      <Header />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main>

        {/* ═══════ HERO ═══════ */}
        <section className="relative h-[85vh] min-h-[560px] max-h-[900px] flex items-end overflow-hidden">
          <div className="absolute inset-0 z-0">
            {hero?.url ? (
              <Image
                src={hero.url}
                alt={hero.alt}
                fill
                className="object-cover"
                priority
                quality={85}
                sizes="100vw"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-sea-800 via-navy-900 to-sea-950" />
            )}
            {/* Bottom gradient — lifts text off the image */}
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/20 to-transparent z-10" />
            {/* Top gradient — ensures nav text is always legible */}
            <div className="absolute inset-x-0 top-0 h-[30%] bg-gradient-to-b from-navy-950/60 to-transparent z-10" />
          </div>

          <div className="container-site relative z-20 pb-12 md:pb-16">
            <p className="font-body text-fluid-sm font-medium tracking-wide-caps uppercase text-sea-300 mb-3">
              Simon&rsquo;s Town, Cape Peninsula
            </p>
            <h1 className="text-white">{property.title}</h1>
            {property.excerpt && (
              <p className="mt-4 text-fluid-lg text-white/75 max-w-xl leading-relaxed">
                {property.excerpt}
              </p>
            )}
          </div>
        </section>

        {/* ═══════ SPECS BAR ═══════ */}
        <div className="bg-white border-b border-stone-200 sticky top-[var(--header-height)] z-20 shadow-sm">
          <div className="container-site">
            <div className="flex items-center gap-8 md:gap-12 py-4 overflow-x-auto">
              <SpecItem label="Bedrooms" value={details.bedrooms} />
              <SpecItem label="Bathrooms" value={details.bathrooms} />
              <SpecItem label="Sleeps" value={details.sleeps} />
              {details.propertyType && (
                <SpecItem label="Type" value={capitalize(details.propertyType)} />
              )}
              {pricing?.minimumStay && (
                <SpecItem
                  label="Min. stay"
                  value={`${pricing.minimumStay} night${pricing.minimumStay !== 1 ? 's' : ''}`}
                />
              )}
              <div className="ml-auto flex-shrink-0">
                <Link href={`/contact?property=${property.slug}`} className="btn-primary text-sm whitespace-nowrap">
                  Make an Enquiry
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════ GALLERY ═══════ */}
        {galleryImages.length > 0 && (
          <section className="section-padding-sm bg-stone-50">
            <div className="container-site">
              <h2 className="text-fluid-2xl mb-8">Gallery</h2>
              <GalleryWithLightbox images={galleryImages} />
            </div>
          </section>
        )}

        {/* ═══════ DESCRIPTION ═══════ */}
        {property.description && (
          <section className="section-padding bg-white">
            <div className="container-narrow">
              <h2 className="text-fluid-2xl mb-8">About this property</h2>
              <div className="prose-rental">
                <RichText data={property.description} />
              </div>
            </div>
          </section>
        )}

        {/* ═══════ AMENITIES ═══════ */}
        {amenities && amenities.length > 0 && (
          <section className="section-padding bg-stone-50">
            <div className="container-site">
              <h2 className="text-fluid-2xl mb-8">Amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {amenities.map((key) => (
                  <div
                    key={key}
                    className="flex items-center gap-3 bg-white rounded-lg px-4 py-3 shadow-sm"
                  >
                    <CheckIcon />
                    <span className="text-sm text-navy-700 font-medium">
                      {AMENITY_LABELS[key] ?? key}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ═══════ PRICING ═══════ */}
        {pricing && (pricing.nightlyRate || pricing.weeklyRate || pricing.monthlyRate) && (
          <section className="section-padding bg-white">
            <div className="container-narrow">
              <h2 className="text-fluid-2xl mb-8">Rates</h2>

              <div className="rounded-xl border border-stone-200 overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-stone-50 border-b border-stone-200">
                      <th className="text-left px-6 py-4 text-sm font-semibold text-navy-600 uppercase tracking-wide-caps">
                        Duration
                      </th>
                      <th className="text-right px-6 py-4 text-sm font-semibold text-navy-600 uppercase tracking-wide-caps">
                        Rate (ZAR)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {pricing.nightlyRate && (
                      <tr>
                        <td className="px-6 py-4 text-navy-700">Per night</td>
                        <td className="px-6 py-4 text-right font-semibold text-navy-950">
                          {formatZAR(pricing.nightlyRate)}
                        </td>
                      </tr>
                    )}
                    {pricing.weeklyRate && (
                      <tr>
                        <td className="px-6 py-4 text-navy-700">Per week</td>
                        <td className="px-6 py-4 text-right font-semibold text-navy-950">
                          {formatZAR(pricing.weeklyRate)}
                        </td>
                      </tr>
                    )}
                    {pricing.monthlyRate && (
                      <tr className="bg-sea-50/60">
                        <td className="px-6 py-4 text-navy-700">
                          Per month
                          <span className="ml-2 inline-block text-xs bg-sea-100 text-sea-700 font-medium px-2 py-0.5 rounded-full">
                            Best value
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right font-semibold text-sea-700">
                          {formatZAR(pricing.monthlyRate)}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {pricing.minimumStay && (
                <p className="mt-4 text-sm text-navy-500">
                  Minimum stay: {pricing.minimumStay} night{pricing.minimumStay !== 1 ? 's' : ''}
                </p>
              )}
              {pricing.pricingNote && (
                <p className="mt-3 text-sm text-navy-500 italic">{pricing.pricingNote}</p>
              )}

              <div className="mt-8 p-6 bg-sea-50 rounded-xl border border-sea-100">
                <p className="text-sm text-navy-600 mb-4">
                  Rates are in South African Rand (ZAR) and may vary by season. Contact us
                  to confirm availability and pricing for your specific dates.
                </p>
                <Link href="/contact" className="btn-primary">
                  Check Availability
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* ═══════ LOCATION ═══════ */}
        {location && (location.address || location.distanceToBeach || location.distanceToTown) && (
          <section className="section-padding bg-stone-50">
            <div className="container-narrow">
              <h2 className="text-fluid-2xl mb-8">Location</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {location.distanceToBeach && (
                  <LocationCard label="To Boulders Beach" value={location.distanceToBeach} />
                )}
                {location.distanceToTown && (
                  <LocationCard label="To town centre" value={location.distanceToTown} />
                )}
                <LocationCard label="Area" value="Simon's Town, Western Cape" />
                <LocationCard
                  label="Nearest airport"
                  value="~50 min from Cape Town International"
                />
              </div>

              {location.address && (
                <p className="text-sm text-navy-500">
                  <span className="font-medium text-navy-700">Address: </span>
                  {location.address}
                  {' '}— full address shared on booking confirmation.
                </p>
              )}
            </div>
          </section>
        )}

        {/* ═══════ CTA ═══════ */}
        <section className="section-padding bg-navy-950 text-white">
          <div className="container-narrow text-center">
            <p className="font-body text-fluid-sm font-medium tracking-wide-caps uppercase text-sea-400 mb-4">
              Ready to book?
            </p>
            <h2 className="text-white mb-6">Enquire about {property.title}</h2>
            <p className="text-fluid-base text-white/70 max-w-xl mx-auto mb-10">
              Send us your dates and number of guests and we&rsquo;ll confirm availability,
              answer any questions, and take it from there.
            </p>
            <Link href={`/contact?property=${property.slug}`} className="btn-primary">
              Send an Enquiry
            </Link>
          </div>
        </section>

      </main>

      <Footer />
    </>
  )
}

// ── Sub-components ────────────────────────────────────────────────────────────

function SpecItem({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex-shrink-0 text-center">
      <p className="text-fluid-2xl font-display text-sea-600 leading-none">{value}</p>
      <p className="text-xs text-navy-500 mt-1 whitespace-nowrap">{label}</p>
    </div>
  )
}

function CheckIcon() {
  return (
    <svg
      className="w-4 h-4 text-sea-500 flex-shrink-0"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" />
      <path
        d="M5 8l2 2 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function LocationCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start gap-4 bg-white rounded-lg px-5 py-4 shadow-sm">
      <svg
        className="w-4 h-4 text-sea-500 flex-shrink-0 mt-0.5"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M8 1.5C5.5 1.5 3.5 3.5 3.5 6c0 3.5 4.5 8.5 4.5 8.5S12.5 9.5 12.5 6c0-2.5-2-4.5-4.5-4.5z" />
        <circle cx="8" cy="6" r="1.5" />
      </svg>
      <div>
        <p className="text-xs text-navy-400 uppercase tracking-wide-caps font-medium">{label}</p>
        <p className="text-sm font-semibold text-navy-900 mt-0.5">{value}</p>
      </div>
    </div>
  )
}
