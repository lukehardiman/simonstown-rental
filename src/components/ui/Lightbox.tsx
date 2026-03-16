'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'

// ── Types ─────────────────────────────────────────────────────────────────────

export type LightboxImage = {
  /** Card-sized URL used in the grid thumbnail */
  src: string
  /** Full/hero-sized URL used in the lightbox */
  fullSrc: string
  alt: string
  caption?: string
  /** First image gets a 2×2 feature slot in the grid */
  isFeature?: boolean
}

// ── GalleryWithLightbox ───────────────────────────────────────────────────────

export function GalleryWithLightbox({ images }: { images: LightboxImage[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [fading, setFading] = useState(false)
  const closeBtnRef = useRef<HTMLButtonElement>(null)

  const isOpen = activeIndex !== null

  // ── Navigation ─────────────────────────────────────────────────────────────

  const navigate = useCallback(
    (direction: 1 | -1) => {
      setFading(true)
      setTimeout(() => {
        setActiveIndex((prev) =>
          prev !== null ? (prev + direction + images.length) % images.length : null,
        )
        setFading(false)
      }, 150)
    },
    [images.length],
  )

  const close = useCallback(() => setActiveIndex(null), [])

  // ── Keyboard ───────────────────────────────────────────────────────────────

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') navigate(-1)
      else if (e.key === 'ArrowRight') navigate(1)
      else if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, navigate, close])

  // ── Body scroll lock ───────────────────────────────────────────────────────

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // ── Focus close button on open ─────────────────────────────────────────────

  useEffect(() => {
    if (isOpen) closeBtnRef.current?.focus()
  }, [isOpen])

  const active = activeIndex !== null ? images[activeIndex] : null

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <>
      {/* Gallery grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`
              group relative overflow-hidden rounded-lg bg-stone-200
              focus:outline-none focus-visible:ring-2 focus-visible:ring-sea-500
              ${img.isFeature ? 'col-span-2 row-span-2 aspect-square' : 'aspect-square'}
            `}
            aria-label={`View ${img.alt}`}
          >
            <Image
              src={img.isFeature ? img.fullSrc : img.src}
              alt={img.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              sizes={
                img.isFeature
                  ? '(max-width: 768px) 100vw, 50vw'
                  : '(max-width: 768px) 50vw, 25vw'
              }
            />

            {/* Hover overlay with expand icon */}
            <div className="absolute inset-0 bg-navy-950/0 group-hover:bg-navy-950/30 transition-colors duration-300 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
              </svg>
            </div>

            {img.caption && (
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950/60 to-transparent p-3 pointer-events-none">
                <p className="text-white text-xs">{img.caption}</p>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Lightbox overlay */}
      {isOpen && active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo lightbox"
          className="fixed inset-0 z-[60] flex items-center justify-center"
          style={{ backgroundColor: 'rgba(26, 34, 52, 0.95)', animation: 'fade-in 0.2s ease forwards' }}
          onClick={(e) => {
            if (e.target === e.currentTarget) close()
          }}
        >
          {/* Counter */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 z-10 text-white/60 text-sm tabular-nums pointer-events-none">
            {activeIndex! + 1} / {images.length}
          </div>

          {/* Close button */}
          <button
            ref={closeBtnRef}
            onClick={close}
            aria-label="Close lightbox"
            className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-5 h-5" aria-hidden="true">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Image area — inset to avoid overlapping nav arrows */}
          <div
            className={`absolute inset-0 flex items-center justify-center px-16 md:px-24 py-20 transition-opacity duration-150 ${fading ? 'opacity-0' : 'opacity-100'}`}
          >
            <div className="relative w-full h-full">
              <Image
                key={activeIndex}
                src={active.fullSrc}
                alt={active.alt}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
          </div>

          {/* Caption */}
          {active.caption && (
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 text-white/60 text-sm text-center max-w-lg px-4 pointer-events-none">
              {active.caption}
            </div>
          )}

          {/* Prev button */}
          <button
            onClick={() => navigate(-1)}
            aria-label="Previous image"
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Next button */}
          <button
            onClick={() => navigate(1)}
            aria-label="Next image"
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      )}
    </>
  )
}
