'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const navigation = [
  { label: 'The House', href: '/property/thomas-street-house' },
  { label: 'Area Guide', href: '/area-guide' },
  { label: 'Our Story', href: '/history' },
  { label: 'Contact', href: '/contact' },
]

type HeaderProps = {
  variant?: 'transparent' | 'light'
}

export function Header({ variant = 'transparent' }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  // Dark text/bg whenever the page has a light background (variant='light')
  // or the user has scrolled past the hero
  const isLight = variant === 'light' || scrolled

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      {/* Header bar — z-[70] sits above the mobile overlay */}
      <header
        className={`
          fixed top-0 inset-x-0 z-[70] transition-all duration-500 ease-smooth
          ${isLight
            ? 'bg-stone-50/95 backdrop-blur-md shadow-sm'
            : 'bg-transparent'
          }
        `}
      >
        <div className="container-site flex items-center justify-between h-[var(--header-height)]">
          {/* Logo */}
          <Link
            href="/"
            className="relative font-display text-fluid-lg tracking-display"
          >
            <span className={`transition-colors duration-500 ${isLight || menuOpen ? 'text-navy-950' : 'text-white'}`}>
              Simon&rsquo;s Town
            </span>
            <span className={`block text-[0.65em] font-body font-light tracking-wide-caps uppercase transition-colors duration-500 ${isLight || menuOpen ? 'text-sea-600' : 'text-sea-200'}`}>
              Rental
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  text-fluid-sm font-medium tracking-wide transition-colors duration-300
                  ${isLight
                    ? 'text-navy-700 hover:text-sea-600'
                    : 'text-white/90 hover:text-white'
                  }
                `}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/contact" className="btn-primary text-sm">
              Book Now
            </Link>
          </nav>

          {/* Mobile Menu Toggle — inside the z-[70] header, always tappable */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span
              className={`block w-6 h-0.5 transition-all duration-300 ease-smooth
                ${menuOpen ? 'rotate-45 translate-y-1 bg-navy-950' : isLight ? 'bg-navy-950' : 'bg-white'}`}
            />
            <span
              className={`block w-6 h-0.5 transition-all duration-300 ease-smooth
                ${menuOpen ? '-rotate-45 -translate-y-1 bg-navy-950' : isLight ? 'bg-navy-950' : 'bg-white'}`}
            />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay — sibling to header, z-[60] so header bar stays on top */}
      <div
        className={`
          fixed inset-0 bg-stone-50 z-[60] flex flex-col items-center justify-center
          transition-all duration-500 ease-smooth md:hidden
          ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
      >
        <nav className="flex flex-col items-center gap-8" aria-label="Mobile navigation">
          {navigation.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="font-display text-fluid-2xl text-navy-950 hover:text-sea-600 transition-colors"
              style={{
                transitionDelay: menuOpen ? `${(i + 1) * 80}ms` : '0ms',
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? 'translateY(0)' : 'translateY(16px)',
                transition: 'opacity 0.4s ease, transform 0.4s ease, color 0.3s ease',
              }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="btn-warm mt-4"
            style={{
              transitionDelay: menuOpen ? `${(navigation.length + 1) * 80}ms` : '0ms',
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? 'translateY(0)' : 'translateY(16px)',
              transition: 'opacity 0.4s ease, transform 0.4s ease',
            }}
          >
            Book Now
          </Link>
        </nav>
      </div>
    </>
  )
}
