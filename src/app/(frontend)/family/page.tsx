import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { getPageBySlug } from '@/lib/payload'
import { RichText } from '@payloadcms/richtext-lexical/react'

export const metadata: Metadata = {
  title: "The Hardiman Family — Our Connection to Simon's Town",
  description:
    "The Hardiman family's connection to Simon's Town stretches across generations. This is the story of how a place becomes part of a family, and why we open our home to guests.",
  openGraph: {
    title: "The Hardiman Family — Our Connection to Simon's Town",
    description:
      "The Hardiman family's connection to Simon's Town stretches across generations. This is the story of how a place becomes part of a family.",
  },
}

export default async function FamilyPage() {
  const page = await getPageBySlug('family')

  return (
    <>
      <Header variant="light" />

      <main>
        {/* ═══════ HERO ═══════ */}
        <section className="pt-[calc(var(--header-height)+5rem)] pb-16 bg-fynbos-800 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_60%,_rgba(222,116,45,0.5),_transparent_60%)]" />
          </div>

          <div className="container-narrow relative z-10">
            <p className="font-body text-fluid-sm font-medium tracking-wide-caps uppercase text-fynbos-300 mb-4">
              Our Story
            </p>
            <h1 className="text-white mb-6">
              The Hardimans<br />
              <span className="text-fynbos-300">&amp; the Deep South</span>
            </h1>
            <p className="text-fluid-lg text-white/75 max-w-2xl leading-relaxed">
              Simon&rsquo;s Town isn&rsquo;t a destination we discovered — it&rsquo;s
              a place we were brought to, grew up with, and kept coming back to.
              This is not a corporate rental. It&rsquo;s our family home, and we
              share it with pride.
            </p>
          </div>
        </section>

        {/* ═══════ CONTENT ═══════ */}
        <section className="section-padding bg-stone-50">
          <div className="container-narrow">
                {page?.content ? (
              <div className="prose-rental">
                <RichText data={page.content} />
              </div>
            ) : (
              <StaticFamilyContent />
            )}

            <div className="mt-10">
              <Link href="/contact" className="btn-primary">
                Make an Enquiry
              </Link>
            </div>
          </div>
        </section>

        {/* ═══════ CROSS-LINK ═══════ */}
        <section className="section-padding-sm bg-white border-t border-stone-200">
          <div className="container-narrow">
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
              <div>
                <p className="text-fluid-sm font-medium text-navy-500 uppercase tracking-wide-caps mb-1">
                  The town
                </p>
                <p className="text-navy-700">
                  Want to know more about Simon&rsquo;s Town itself?
                </p>
              </div>
              <Link href="/history" className="btn-secondary whitespace-nowrap flex-shrink-0">
                History of Simon&rsquo;s Town
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

// ── Static placeholder content ─────────────────────────────────────────────

function StaticFamilyContent() {
  return (
    <div className="prose-rental">
      <h2>How It Started</h2>
      <p>
        The family connection to Simon&rsquo;s Town didn&rsquo;t begin with a
        property search or a lifestyle decision. It began, as these things often
        do, with people who simply couldn&rsquo;t stay away. The draw of False
        Bay — the particular quality of light on the water in the early morning,
        the smell of fynbos after winter rain, the penguins waddling across the
        path to the beach — has a way of making itself felt in the bones.
      </p>
      <p>
        For the Hardiman family, Simon&rsquo;s Town was always the place you came
        back to. As children, as young adults, and eventually as a family with
        children of our own — the town kept pulling us south down the M3, past
        Muizenberg, past Fish Hoek, until the naval dockyard appeared around the
        last bend in the road.
      </p>

      <h2>13 Thomas Street</h2>
      <p>
        The house on Thomas Street has its own history within ours. It sits on
        the slope above the main road, high enough for mountain views to one side
        and glimpses of the harbour to the other. The garden has seen children
        grow up, summers spent under its shade, and the particular kind of
        unhurried time that the peninsula seems to produce.
      </p>
      <p>
        We&rsquo;ve cared for the house the way you care for something you love:
        slowly, thoughtfully, without rushing to modernise what doesn&rsquo;t need
        it. The result is a home that feels lived-in in the best sense — comfortable,
        personal, with a character that no amount of staged interior design could
        replicate.
      </p>

      <h2>Why We Share It</h2>
      <p>
        When we began thinking about making the house available to guests, the
        conversation was less about rental income and more about stewardship.
        A house like this wants to be used. It wants people sitting on the stoep
        in the late afternoon, walking down to Boulders Beach in the morning,
        cooking in the kitchen, arguing gently about which restaurant to try.
      </p>
      <p>
        We also know, from long experience, that not every visitor to Simon&rsquo;s
        Town finds what we&rsquo;ve found here. The hotels are fine, but they don&rsquo;t
        give you a garden, or a proper kitchen, or the quiet of a residential
        street rather than the bustle of the waterfront. We wanted to offer
        something different — the experience of actually living in the town, even
        briefly, rather than just passing through it.
      </p>

      <h2>What Guests Can Expect from Us</h2>
      <p>
        We are hands-on owners, not a management company. When you stay at
        Thomas Street House, you&rsquo;re dealing with us directly — a real family
        who knows the property intimately, who can tell you which restaurants to
        book months ahead and which you can walk into on a Tuesday night, who
        knows the best time to visit Boulders to avoid the school groups, and
        where to park when the main road is jammed on a long weekend.
      </p>
      <p>
        Our recommendation is the same one we give friends and family: slow down.
        The Cape Peninsula rewards the unhurried visitor. Give yourself at least
        a week — ideally two. Wake up without an itinerary and see where the day
        takes you. The penguins will still be there tomorrow.
      </p>

      <h2>A Note on the Name</h2>
      <p>
        You may have heard the phrase &ldquo;the Deep South&rdquo; used to describe
        the Simon&rsquo;s Town area — the far end of the Cape Peninsula, below the
        mountains and the passes, where the road eventually runs out at Cape Point.
        It&rsquo;s a half-joke about the distance from Cape Town (closer to an
        hour on a bad day than the 40 minutes the map suggests), but it&rsquo;s
        also a genuine description of character. The Deep South has its own rhythm,
        its own community, its own eccentric pride. We wouldn&rsquo;t have it
        any other way.
      </p>

    </div>
  )
}
