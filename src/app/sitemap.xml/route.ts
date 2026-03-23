import { getProperties } from '@/lib/payload'

const BASE_URL = 'https://simonstownrental.com'

interface SitemapEntry {
  url: string
  lastModified: Date
  changeFrequency: string
  priority: number
}

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0]
}

function urlElement(entry: SitemapEntry): string {
  return `  <url>
    <loc>${entry.url}</loc>
    <lastmod>${formatDate(entry.lastModified)}</lastmod>
    <changefreq>${entry.changeFrequency}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
}

export async function GET() {
  const properties = await getProperties()

  const staticPages: SitemapEntry[] = [
    { url: BASE_URL,                      lastModified: new Date(), changeFrequency: 'monthly', priority: 1.0 },
    { url: `${BASE_URL}/contact`,         lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.8 },
    { url: `${BASE_URL}/area-guide`,      lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE_URL}/family`,          lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.6 },
    { url: `${BASE_URL}/history`,         lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.6 },
  ]

  const propertyPages: SitemapEntry[] = properties.map((property) => ({
    url: `${BASE_URL}/property/${property.slug}`,
    lastModified: property.updatedAt ? new Date(property.updatedAt) : new Date(),
    changeFrequency: 'monthly',
    priority: 0.9,
  }))

  const entries = [...staticPages, ...propertyPages]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map(urlElement).join('\n')}
</urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  })
}
