import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  description:
    "Boutique self-catering holiday rental in historic Simon's Town, South Africa. Mountain views, harbour charm, and the Cape Peninsula on your doorstep.",
}

export default function HomePage() {
  return (
    <>
      <Header />

      <main>
        {/* ═══════ HERO ═══════ */}
        <section className="relative min-h-[100svh] flex items-end pb-16 md:pb-24 overflow-hidden">
          {/* Background image — replace src with actual hero */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-navy-950/40 z-10" />
            {/* Placeholder gradient until real image is added */}
            <div className="absolute inset-0 bg-gradient-to-br from-sea-800 via-navy-900 to-sea-950" />
            {/* Uncomment when hero image is ready:
            <Image
              src="/images/property/hero.jpg"
              alt="View of Simon's Town harbour from the rental property"
              fill
              className="object-cover"
              priority
              quality={85}
              sizes="100vw"
            />
            */}
          </div>

          <div className="container-site relative z-20">
            <div className="max-w-3xl stagger-children">
              <p className="font-body text-fluid-sm font-medium tracking-wide-caps uppercase text-sea-300 mb-4">
                Simon&rsquo;s Town, Cape Peninsula
              </p>
              <h1 className="text-white mb-6">
                Your home on the
                <br />
                <span className="text-sea-300">Cape Peninsula</span>
              </h1>
              <p className="text-fluid-lg text-white/80 max-w-xl mb-10 leading-relaxed">
                A carefully curated holiday home in one of South Africa&rsquo;s
                most historic coastal towns. Mountain views, harbour walks, and
                the wild beauty of Cape Point — all on your doorstep.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/property/thomas-street-house" className="btn-primary">
                  View the House
                </Link>
                <Link href="/contact" className="btn border-2 border-white text-white hover:bg-white hover:text-navy-950">
                  Make an Enquiry
                </Link>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:block">
            <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2">
              <div className="w-1 h-2.5 bg-white/60 rounded-full animate-bounce" />
            </div>
          </div>
        </section>

        {/* ═══════ INTRODUCTION ═══════ */}
        <section className="section-padding bg-stone-50">
          <div className="container-narrow text-center">
            <p className="font-body text-fluid-sm font-medium tracking-wide-caps uppercase text-sea-600 mb-4">
              Welcome
            </p>
            <h2 className="mb-8">
              Where the mountain meets the sea
            </h2>
            <p className="text-fluid-lg text-navy-700 mx-auto max-w-2xl leading-relaxed">
              Nestled between the slopes of the Cape Peninsula mountains and the
              calm waters of False Bay, Simon&rsquo;s Town offers a rare
              combination of natural beauty, naval heritage, and authentic South
              African warmth. Our family home has been part of this community for
              generations.
            </p>
          </div>
        </section>

        {/* ═══════ PROPERTY HIGHLIGHT ═══════ */}
        <section className="section-padding bg-white">
          <div className="container-site">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Image grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 aspect-[16/10] rounded-lg bg-stone-200 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-sea-100 to-stone-200 flex items-center justify-center text-stone-400 text-sm">
                    Property exterior
                  </div>
                </div>
                <div className="aspect-square rounded-lg bg-stone-200 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-sea-50 to-stone-200 flex items-center justify-center text-stone-400 text-sm">
                    Living area
                  </div>
                </div>
                <div className="aspect-square rounded-lg bg-stone-200 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-fynbos-50 to-stone-200 flex items-center justify-center text-stone-400 text-sm">
                    View
                  </div>
                </div>
              </div>

              {/* Text */}
              <div>
                <p className="font-body text-fluid-sm font-medium tracking-wide-caps uppercase text-fynbos-500 mb-4">
                  The House
                </p>
                <h2 className="mb-6">
                  Space, comfort, and
                  <br />
                  that view
                </h2>
                <div className="prose-rental">
                  <p>
                    A spacious, sun-filled family home with mountain and harbour
                    views. Fully self-catering with everything you need for a
                    week, a month, or a season on the peninsula.
                  </p>
                  <p>
                    Three bedrooms, two bathrooms, a private garden with braai,
                    and secure parking. Walking distance to the historic
                    waterfront, restaurants, and the famous Boulders Beach
                    penguin colony.
                  </p>
                </div>

                {/* Key specs */}
                <div className="grid grid-cols-3 gap-6 mt-8 mb-8 py-6 border-y border-stone-200">
                  <div>
                    <p className="text-fluid-2xl font-display text-sea-600">3</p>
                    <p className="text-sm text-navy-500">Bedrooms</p>
                  </div>
                  <div>
                    <p className="text-fluid-2xl font-display text-sea-600">2</p>
                    <p className="text-sm text-navy-500">Bathrooms</p>
                  </div>
                  <div>
                    <p className="text-fluid-2xl font-display text-sea-600">6</p>
                    <p className="text-sm text-navy-500">Sleeps</p>
                  </div>
                </div>

                <Link href="/property/thomas-street-house" className="btn-secondary">
                  Full Property Details
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════ AREA HIGHLIGHTS ═══════ */}
        <section className="section-padding bg-stone-50 relative grain">
          <div className="container-site relative z-10">
            <div className="text-center mb-16">
              <p className="font-body text-fluid-sm font-medium tracking-wide-caps uppercase text-sea-600 mb-4">
                The Peninsula
              </p>
              <h2 className="mb-4">More than a place to stay</h2>
              <p className="text-fluid-base text-navy-600 max-w-xl mx-auto">
                From Boulders Beach to Cape Point, the South Peninsula is one
                of the world&rsquo;s great stretches of coastline.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Boulders Beach',
                  description: 'The famous African penguin colony — a 5-minute walk from the house.',
                  category: 'Nature',
                },
                {
                  title: 'Kalk Bay Harbour',
                  description: 'Fresh fish, artisan shops, and the best café culture on the peninsula.',
                  category: 'Dining & Culture',
                },
                {
                  title: 'Cape Point',
                  description: 'Where the Atlantic meets the Indian Ocean. Hiking, wildlife, and drama.',
                  category: 'Day Trip',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="aspect-[4/3] bg-stone-200 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-sea-100 to-stone-200 flex items-center justify-center text-stone-400 text-sm">
                      {item.title}
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-xs font-medium tracking-wide-caps uppercase text-fynbos-500 mb-2">
                      {item.category}
                    </p>
                    <h3 className="text-fluid-lg mb-2">{item.title}</h3>
                    <p className="text-sm text-navy-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/area-guide" className="btn-secondary">
                Explore the Area Guide
              </Link>
            </div>
          </div>
        </section>

        {/* ═══════ FAMILY STORY TEASER ═══════ */}
        <section className="section-padding bg-navy-950 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(46,145,165,0.3),_transparent_60%)]" />
          </div>
          <div className="container-narrow relative z-10 text-center">
            <p className="font-body text-fluid-sm font-medium tracking-wide-caps uppercase text-sea-400 mb-4">
              Our Story
            </p>
            <h2 className="text-white mb-6">
              Rooted in the Deep South
            </h2>
            <p className="text-fluid-lg text-white/70 max-w-2xl mx-auto mb-10">
              The Hardiman family connection to Simon&rsquo;s Town stretches
              back generations. This isn&rsquo;t a corporate rental — it&rsquo;s
              our family home, and we share it with the same pride and care
              we&rsquo;d offer any guest.
            </p>
            <Link
              href="/family"
              className="btn border-2 border-white/30 text-white hover:bg-white hover:text-navy-950 transition-all"
            >
              Read the Family Story
            </Link>
          </div>
        </section>

        {/* ═══════ CTA ═══════ */}
        <section className="section-padding bg-sea-600 text-white">
          <div className="container-narrow text-center">
            <h2 className="text-white mb-4">
              Ready to plan your stay?
            </h2>
            <p className="text-fluid-base text-white/80 max-w-lg mx-auto mb-8">
              Whether it&rsquo;s a week by the sea, a month of remote work, or
              a full southern hemisphere summer — we&rsquo;d love to host you.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn bg-white text-sea-700 hover:bg-stone-50 font-semibold">
                Make an Enquiry
              </Link>
              <Link
                href="/property/thomas-street-house"
                className="btn border-2 border-white text-white hover:bg-white/10"
              >
                View the House
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
