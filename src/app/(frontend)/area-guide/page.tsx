import type { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { AreaGuideFilter } from '@/components/ui/AreaGuideFilter'
import { getAreaGuide } from '@/lib/payload'

export const metadata: Metadata = {
  title: "Area Guide — Simon's Town & the South Peninsula",
  description:
    "Our family's guide to the best of Simon's Town and the Cape South Peninsula — from Boulders Beach penguins to Kalk Bay cafés, Cape Point hikes, and hidden local gems.",
  alternates: { canonical: '/area-guide' },
  openGraph: {
    title: "Area Guide — Simon's Town & the South Peninsula",
    description:
      "Our family's guide to the best of Simon's Town and the Cape South Peninsula — from Boulders Beach penguins to Kalk Bay cafés, Cape Point hikes, and hidden local gems.",
  },
}

export default async function AreaGuidePage() {
  const entries = await getAreaGuide()

  return (
    <>
      <Header variant="light" />

      <main>
        {/* ═══════ PAGE HEADER ═══════ */}
        <section className="pt-[calc(var(--header-height)+4rem)] pb-16 bg-stone-50">
          <div className="container-narrow text-center">
            <p className="font-body text-fluid-sm font-medium tracking-wide-caps uppercase text-sea-600 mb-4">
              The South Peninsula
            </p>
            <h1 className="mb-6">Area Guide</h1>
            <p className="text-fluid-lg text-navy-700 max-w-2xl mx-auto leading-relaxed">
              Simon&rsquo;s Town sits at the heart of one of the world&rsquo;s
              great stretches of coastline. Here&rsquo;s our family&rsquo;s
              curated guide to the places, experiences, and hidden gems that
              make the Cape South Peninsula extraordinary.
            </p>
          </div>
        </section>

        {/* ═══════ FILTER + GRID ═══════ */}
        <section className="section-padding bg-white">
          <div className="container-site">
            <AreaGuideFilter entries={entries} />
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
