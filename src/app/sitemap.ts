import type { MetadataRoute } from 'next'
import { getProperties } from '@/lib/payload'

const BASE_URL = 'https://simonstownrental.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const properties = await getProperties()

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/area-guide`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/family`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/history`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.6,
    },
  ]

  const propertyPages: MetadataRoute.Sitemap = properties.map((property) => ({
    url: `${BASE_URL}/property/${property.slug}`,
    lastModified: property.updatedAt ? new Date(property.updatedAt) : new Date(),
    changeFrequency: 'monthly',
    priority: 0.9,
  }))

  return [...staticPages, ...propertyPages]
}
