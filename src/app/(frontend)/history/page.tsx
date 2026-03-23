import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { getPageBySlug } from '@/lib/payload'
import { RichText } from '@payloadcms/richtext-lexical/react'

export const metadata: Metadata = {
  title: "History of Simon's Town — A Naval Town Shaped by the Sea",
  description:
    "Simon's Town has one of the richest histories in South Africa — Dutch traders, British admirals, apartheid, and a community that endured. Explore 300+ years of the Cape Peninsula's most storied harbour town.",
  alternates: { canonical: '/history' },
  openGraph: {
    title: "History of Simon's Town — A Naval Town Shaped by the Sea",
    description:
      "Simon's Town has one of the richest histories in South Africa — Dutch traders, British admirals, apartheid, and a community that endured.",
  },
}

export default async function HistoryPage() {
  const page = await getPageBySlug('history')

  return (
    <>
      <Header variant="light" />

      <main>
        {/* ═══════ HERO ═══════ */}
        <section className="pt-[calc(var(--header-height)+5rem)] pb-16 bg-navy-950 text-white relative overflow-hidden">
          {/* Subtle texture */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,_rgba(46,145,165,0.4),_transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,_rgba(46,145,165,0.2),_transparent_50%)]" />
          </div>

          <div className="container-narrow relative z-10">
            <p className="font-body text-fluid-sm font-medium tracking-wide-caps uppercase text-sea-400 mb-4">
              Simon&rsquo;s Town, Cape Peninsula
            </p>
            <h1 className="text-white mb-6">
              A Town Shaped<br />
              <span className="text-sea-300">by the Sea</span>
            </h1>
            <p className="text-fluid-lg text-white/75 max-w-2xl leading-relaxed">
              Three centuries of sailors, settlers, admirals, and families. Simon&rsquo;s
              Town is one of South Africa&rsquo;s most historically layered places —
              a naval harbour that became a community, and a community that refused to
              be erased.
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
              <StaticHistoryContent />
            )}
          </div>
        </section>

        {/* ═══════ CROSS-LINK ═══════ */}
        <section className="section-padding-sm bg-white border-t border-stone-200">
          <div className="container-narrow">
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
              <div>
                <p className="text-fluid-sm font-medium text-navy-500 uppercase tracking-wide-caps mb-1">
                  About us
                </p>
                <p className="text-navy-700">
                  Curious about the family behind the rental?
                </p>
              </div>
              <Link href="/family" className="btn-secondary whitespace-nowrap flex-shrink-0">
                Meet the Hardimans
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

function StaticHistoryContent() {
  return (
    <div className="prose-rental">
      <h2>The Dutch Arrive at the Cape</h2>
      <p>
        Long before Simon&rsquo;s Town had a name, the sheltered bay on the eastern
        shore of the Cape Peninsula offered the best natural anchorage between
        Europe and the East Indies. The Dutch East India Company (VOC) established
        their refreshment station at the Cape in 1652, and sailors quickly learned
        that the bay — protected from the fierce north-westerly gales that battered
        Table Bay in winter — was a far safer harbour for their fleets.
      </p>
      <p>
        The bay was named after Simon van der Stel, Governor of the Cape Colony from
        1679 to 1699, who ordered the construction of a small outpost here. The
        sheltered waters became the VOC&rsquo;s preferred winter anchorage, and a
        small settlement of taverns, repair facilities, and provisioning stores grew
        up along the shore.
      </p>

      <h2>A British Naval Base</h2>
      <p>
        Britain seized the Cape Colony from the Batavian Republic in 1806, and
        Simon&rsquo;s Town&rsquo;s strategic importance immediately became clear to
        the Royal Navy. In 1814, the town became an official British naval base — a
        status it would hold for the better part of two centuries.
      </p>
      <p>
        The dockyard was progressively expanded throughout the 19th century. Dry
        docks were cut into the granite hillside. Stone magazines, barracks, and
        officers&rsquo; residences were built in the Georgian style that still lines
        the main road today. By the time of the Anglo-Boer War, Simon&rsquo;s Town
        was the most significant naval installation in the southern hemisphere.
      </p>

      <h2>The Dockyard and Two World Wars</h2>
      <p>
        During both World Wars, the Simon&rsquo;s Town dockyard operated at full
        capacity. In the First World War, the South Atlantic naval campaign was
        partially coordinated from the base. In the Second, the harbour was a
        vital staging point for Allied convoys rounding the Cape — the
        Mediterranean route having been closed by Axis forces.
      </p>
      <p>
        German U-boats prowled the waters off the Cape, and the dockyard worked
        around the clock to repair and resupply Allied vessels. The community
        lived with the rhythms of war — servicemen from across the Commonwealth
        passing through, the harbour lights dimmed, and the constant presence of
        naval patrols.
      </p>

      <h2>The Community Through Apartheid</h2>
      <p>
        Simon&rsquo;s Town&rsquo;s history carries a painful chapter that cannot be
        glossed over. For generations, the town had been home to a diverse
        community — Malay fishermen, Cape Coloured families who had lived here for
        centuries, traders and craftspeople of mixed heritage. The main road and its
        side streets were woven with this complexity.
      </p>
      <p>
        The Group Areas Act of 1950 designated Simon&rsquo;s Town as a &ldquo;white&rdquo;
        area. Thousands of residents — many of them families who had lived in the
        town for four and five generations — were forcibly removed to the townships
        of Ocean View and Red Hill on the other side of the mountain. Homes were
        demolished. A community was fractured.
      </p>
      <p>
        The legacy of those removals is still felt. The Simon&rsquo;s Town Museum
        preserves much of this history, and in recent decades former residents and
        their descendants have worked to have their stories told and their
        connections to the town acknowledged.
      </p>

      <h2>Transfer to the South African Navy</h2>
      <p>
        In 1957, the Royal Navy finally handed Simon&rsquo;s Town over to South
        Africa. The South African Navy (SAN) continues to operate the base today —
        it remains the country&rsquo;s primary naval installation and the home port
        of the SAN&rsquo;s surface fleet. The naval presence is still very much
        part of the town&rsquo;s character: the distinctive white naval buildings
        visible from the harbour, the mast of a retired frigate pointing skyward
        near the museum, and uniformed sailors walking the main road.
      </p>

      <h2>Simon&rsquo;s Town Today</h2>
      <p>
        Contemporary Simon&rsquo;s Town is a heritage town with a living identity.
        The Victorian and Georgian streetscape along St George&rsquo;s Street is
        one of the best-preserved in South Africa. The waterfront is a mix of
        working fishing boats, naval vessels, pleasure craft, and the ferry to
        Cape Town.
      </p>
      <p>
        Boulders Beach — a ten-minute walk from the house — is home to one of
        the world&rsquo;s only land-based African penguin colonies. False Bay is
        rich with marine life: great white sharks, southern right whales (June to
        November), Cape fur seals, and some of the finest shore angling in the
        country.
      </p>
      <p>
        The town&rsquo;s restaurants, galleries, and museums reflect both its
        naval heritage and its natural setting. It is a place with a strong sense
        of its own story — which is, perhaps, why families like ours keep
        returning to it, generation after generation.
      </p>
    </div>
  )
}
