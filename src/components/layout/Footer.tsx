import Link from 'next/link'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-navy-950 text-white/80 mt-auto">
      <div className="container-site section-padding-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block">
              <span className="font-display text-fluid-xl text-white tracking-display">
                Simon&rsquo;s Town
              </span>
              <span className="block text-sm font-body font-light tracking-wide-caps uppercase text-sea-400">
                Rental
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed max-w-xs text-white/60">
              Boutique self-catering holiday accommodation in historic
              Simon&rsquo;s Town, on South Africa&rsquo;s Cape Peninsula.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-body text-sm font-semibold tracking-wide-caps uppercase text-white/40 mb-4">
              Explore
            </h3>
            <nav className="flex flex-col gap-3" aria-label="Footer navigation">
              <Link href="/property/thomas-street-house" className="text-sm hover:text-sea-300 transition-colors">
                The House
              </Link>
              <Link href="/area-guide" className="text-sm hover:text-sea-300 transition-colors">
                Area Guide
              </Link>
              <Link href="/history" className="text-sm hover:text-sea-300 transition-colors">
                Simon&rsquo;s Town History
              </Link>
              <Link href="/family" className="text-sm hover:text-sea-300 transition-colors">
                The Hardiman Family
              </Link>
              <Link href="/contact" className="text-sm hover:text-sea-300 transition-colors">
                Contact &amp; Booking
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-body text-sm font-semibold tracking-wide-caps uppercase text-white/40 mb-4">
              Get in Touch
            </h3>
            <div className="flex flex-col gap-3 text-sm">
              <a
                href="mailto:info@simonstownrental.com"
                className="hover:text-sea-300 transition-colors"
              >
                info@simonstownrental.com
              </a>
              {/* WhatsApp link — update number when ready */}
              <a
                href="https://wa.me/"
                className="hover:text-sea-300 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/40">
            &copy; {currentYear} Simon&rsquo;s Town Rental. All rights reserved.
          </p>
          <p className="text-xs text-white/30">
            Simon&rsquo;s Town, Western Cape, South Africa
          </p>
        </div>
      </div>
    </footer>
  )
}
