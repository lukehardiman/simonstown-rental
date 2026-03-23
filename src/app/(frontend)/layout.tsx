import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Libre_Franklin } from 'next/font/google'
import { GoogleAnalytics } from '@next/third-parties/google'
import React from 'react'

import '@/styles/globals.css'

const fontDisplay = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  weight: ['400', '600', '700'],
})

const fontBody = Libre_Franklin({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
  weight: ['300', '400', '500', '600'],
})

export const viewport: Viewport = {
  themeColor: '#2e91a5',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://simonstownrental.com'),
  title: {
    default: "Simon's Town Rental — Holiday Accommodation, Cape Peninsula",
    template: "%s — Simon's Town Rental",
  },
  description:
    "Boutique self-catering holiday rental in historic Simon's Town on South Africa's Cape Peninsula. Mountain and harbour views, walking distance to Boulders Beach.",
  openGraph: {
    type: 'website',
    locale: 'en_ZA',
    siteName: "Simon's Town Rental",
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fontDisplay.variable} ${fontBody.variable}`}>
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body>
        {children}
      </body>
      {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
      )}
    </html>
  )
}
