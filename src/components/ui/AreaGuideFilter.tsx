'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { AreaGuide, Media } from '@/payload-types'

// ── Category config ───────────────────────────────────────────────────────────

const FILTERS = [
  { value: 'all',        label: 'All' },
  { value: 'dining',     label: 'Where to Eat' },
  { value: 'activities', label: 'Things to Do' },
  { value: 'nature',     label: 'Nature & Wildlife' },
  { value: 'beaches',    label: 'Beaches' },
  { value: 'history',    label: 'History & Culture' },
  { value: 'daytrips',   label: 'Day Trips' },
] as const

const CATEGORY_LABELS: Record<AreaGuide['category'], string> = {
  dining:     'Where to Eat',
  activities: 'Things to Do',
  nature:     'Nature & Wildlife',
  beaches:    'Beaches',
  history:    'History & Culture',
  shopping:   'Shopping & Markets',
  daytrips:   'Day Trips',
  practical:  'Practical Info',
}

const CATEGORY_PILL: Record<AreaGuide['category'], string> = {
  dining:     'bg-fynbos-100 text-fynbos-700',
  activities: 'bg-sea-100 text-sea-700',
  nature:     'bg-sea-100 text-sea-700',
  beaches:    'bg-sea-100 text-sea-700',
  history:    'bg-stone-200 text-stone-700',
  shopping:   'bg-fynbos-100 text-fynbos-700',
  daytrips:   'bg-navy-100 text-navy-700',
  practical:  'bg-stone-200 text-stone-700',
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function isMedia(v: (string | null) | Media | undefined): v is Media {
  return typeof v === 'object' && v !== null
}

// ── Component ─────────────────────────────────────────────────────────────────

export function AreaGuideFilter({ entries }: { entries: AreaGuide[] }) {
  const [active, setActive] = useState<string>('all')

  const filtered = active === 'all'
    ? entries
    : entries.filter((e) => e.category === active)

  return (
    <>
      {/* Filter bar */}
      <div className="flex flex-wrap gap-2 mb-10">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setActive(f.value)}
            className={`
              px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200
              focus:outline-none focus-visible:ring-2 focus-visible:ring-sea-500
              ${active === f.value
                ? 'bg-sea-600 text-white shadow-sm'
                : 'bg-white border border-stone-200 text-navy-700 hover:border-sea-400 hover:text-sea-600'
              }
            `}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <EmptyState hasEntries={entries.length > 0} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((entry) => (
            <EntryCard key={entry.id} entry={entry} />
          ))}
        </div>
      )}
    </>
  )
}

// ── Entry card ────────────────────────────────────────────────────────────────

function EntryCard({ entry }: { entry: AreaGuide }) {
  const image = isMedia(entry.featuredImage) ? entry.featuredImage : null
  const imgSrc = image?.sizes?.medium?.url ?? image?.url ?? null

  return (
    <article className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col">

      {/* Image */}
      <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden flex-shrink-0">
        {imgSrc ? (
          <Image
            src={imgSrc}
            alt={image?.alt ?? entry.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-sea-100 via-stone-100 to-stone-200 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-stone-300"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              aria-hidden="true"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M3 15l5-5 4 4 3-3 6 6" />
              <circle cx="8.5" cy="8.5" r="1.5" />
            </svg>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">

        {/* Category pill */}
        <span className={`
          self-start text-xs font-medium tracking-wide-caps uppercase px-2.5 py-1 rounded-full mb-3
          ${CATEGORY_PILL[entry.category]}
        `}>
          {CATEGORY_LABELS[entry.category]}
        </span>

        <h3 className="text-fluid-lg font-display text-navy-950 mb-2 leading-snug">
          {entry.title}
        </h3>

        {entry.excerpt && (
          <p className="text-sm text-navy-600 leading-relaxed line-clamp-3 flex-1">
            {entry.excerpt}
          </p>
        )}

        {/* Insider tip */}
        {entry.insiderTip && (
          <div className="mt-4 flex gap-2.5 bg-fynbos-50 border border-fynbos-100 rounded-lg p-3">
            <svg
              className="w-4 h-4 text-fynbos-500 flex-shrink-0 mt-0.5"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M8 2a4 4 0 0 1 1.5 7.7V11H6.5V9.7A4 4 0 0 1 8 2z" />
              <path d="M6.5 12.5h3M7 14h2" />
            </svg>
            <p className="text-xs text-fynbos-800 leading-relaxed italic">
              {entry.insiderTip}
            </p>
          </div>
        )}
      </div>
    </article>
  )
}

// ── Empty state ───────────────────────────────────────────────────────────────

function EmptyState({ hasEntries }: { hasEntries: boolean }) {
  return (
    <div className="col-span-full py-20 text-center">
      <p className="text-fluid-xl font-display text-navy-300 mb-3">
        {hasEntries ? 'Nothing in this category yet' : 'Coming soon'}
      </p>
      <p className="text-sm text-navy-400 max-w-sm mx-auto">
        {hasEntries
          ? 'Try a different filter to see more of the peninsula.'
          : "We're building out our local knowledge base. Check back soon for recommendations from the Hardiman family."}
      </p>
    </div>
  )
}
