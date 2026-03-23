import type { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'

import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { EnquiryForm } from '@/components/forms/EnquiryForm'

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: 'Contact & Booking',
  description:
    "Enquire about availability and rates for our self-catering holiday rental in Simon's Town, Cape Peninsula. We typically respond within 24 hours.",
  alternates: { canonical: '/contact' },
}

// ── Page ──────────────────────────────────────────────────────────────────────

type Props = {
  searchParams: Promise<{ property?: string }>
}

export default async function ContactPage({ searchParams }: Props) {
  const { property } = await searchParams

  return (
    <>
      <Header variant="light" />

      <main>

        {/* ═══════ PAGE HEADER ═══════ */}
        <section className="bg-stone-50 border-b border-stone-200 pt-[calc(var(--header-height)+3rem)] pb-12 md:pb-16">
          <div className="container-narrow text-center">
            <p className="font-body text-fluid-sm font-medium tracking-wide-caps uppercase text-sea-600 mb-4">
              Get in touch
            </p>
            <h1 className="mb-6">Contact &amp; Booking</h1>
            <p className="text-fluid-lg text-navy-600 leading-relaxed max-w-2xl mx-auto">
              We&rsquo;d love to hear from you. Whether you have questions about the property,
              want to check availability, or are ready to book — drop us a message and we&rsquo;ll
              get back to you personally, usually within 24 hours.
            </p>
          </div>
        </section>

        {/* ═══════ FORM + CONTACT DETAILS ═══════ */}
        <section className="section-padding bg-white">
          <div className="container-site">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

              {/* ── Form (wider column) ── */}
              <div className="lg:col-span-2">

                {/* Property context banner */}
                {property && (
                  <div className="flex items-center gap-3 bg-sea-50 border border-sea-200 rounded-lg px-5 py-4 mb-8">
                    <svg
                      className="w-4 h-4 text-sea-600 flex-shrink-0"
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
                    <p className="text-sm text-navy-700">
                      Enquiring about{' '}
                      <span className="font-semibold text-navy-950">
                        {formatPropertySlug(property)}
                      </span>
                      {' '}—{' '}
                      <Link href={`/property/${property}`} className="text-sea-600 hover:text-sea-700 underline underline-offset-2">
                        back to property
                      </Link>
                    </p>
                  </div>
                )}

                <EnquiryForm />
              </div>

              {/* ── Contact details sidebar ── */}
              <aside className="lg:col-span-1">
                <div className="lg:sticky lg:top-[calc(var(--header-height)+2rem)] space-y-8">

                  {/* Direct contact */}
                  <div>
                    <h2 className="text-fluid-lg font-display mb-5">Direct contact</h2>
                    <div className="space-y-4">

                      <ContactDetail
                        label="Email"
                        href="mailto:info@simonstownrental.com"
                        display="info@simonstownrental.com"
                        icon={<EmailIcon />}
                      />

                      <ContactDetail
                        label="WhatsApp"
                        href="https://wa.me/"
                        display="Message us on WhatsApp"
                        icon={<WhatsAppIcon />}
                        external
                      />

                    </div>
                  </div>

                  {/* Location */}
                  <div className="pt-8 border-t border-stone-200">
                    <h2 className="text-fluid-lg font-display mb-5">Location</h2>
                    <div className="flex items-start gap-3">
                      <svg
                        className="w-4 h-4 text-sea-500 flex-shrink-0 mt-1"
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
                      <address className="not-italic text-sm text-navy-600 leading-relaxed">
                        Simon&rsquo;s Town<br />
                        Western Cape<br />
                        South Africa
                      </address>
                    </div>
                    <p className="mt-4 text-sm text-navy-500">
                      Full address provided on booking confirmation.
                    </p>
                  </div>

                  {/* Response time note */}
                  <div className="pt-8 border-t border-stone-200">
                    <div className="bg-stone-50 rounded-lg p-5">
                      <p className="text-sm font-semibold text-navy-800 mb-2">
                        Typical response time
                      </p>
                      <p className="text-sm text-navy-600 leading-relaxed">
                        We aim to respond to all enquiries within{' '}
                        <span className="font-medium text-navy-800">24 hours</span>,
                        often much sooner. For urgent availability questions,
                        WhatsApp is the fastest way to reach us.
                      </p>
                    </div>
                  </div>

                </div>
              </aside>

            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  )
}

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Convert a slug like "the-beach-house" to "The Beach House" for display.
 */
function formatPropertySlug(slug: string) {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

// ── Sub-components ────────────────────────────────────────────────────────────

function ContactDetail({
  label,
  href,
  display,
  icon,
  external = false,
}: {
  label: string
  href: string
  display: string
  icon: React.ReactNode
  external?: boolean
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 text-sea-500 flex-shrink-0">{icon}</span>
      <div>
        <p className="text-xs text-navy-400 uppercase tracking-wide-caps font-medium mb-0.5">
          {label}
        </p>
        <a
          href={href}
          className="text-sm font-medium text-navy-800 hover:text-sea-600 transition-colors underline-offset-2 hover:underline"
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {display}
        </a>
      </div>
    </div>
  )
}

function EmailIcon() {
  return (
    <svg
      className="w-4 h-4"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="1.5" y="3.5" width="13" height="9" rx="1.5" />
      <path d="M1.5 5.5l6.5 4 6.5-4" />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg
      className="w-4 h-4"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M8 1.5a6.5 6.5 0 0 1 5.63 9.78l.87 2.97-3.06-.86A6.5 6.5 0 1 1 8 1.5z" />
      <path d="M6 6.5c.17.5.5 1.5 1.5 2s1.83.67 2.5.5" />
    </svg>
  )
}
