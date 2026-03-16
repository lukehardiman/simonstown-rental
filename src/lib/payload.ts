import { getPayload } from 'payload'
import type { Where } from 'payload'
import config from '@payload-config'

export async function getPayloadClient() {
  return getPayload({ config })
}

/**
 * Fetch a single property by slug
 */
export async function getPropertyBySlug(slug: string) {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'properties',
    where: {
      slug: { equals: slug },
      status: { equals: 'published' },
    },
    limit: 1,
    depth: 2,
  })
  return result.docs[0] || null
}

/**
 * Fetch all published properties
 */
export async function getProperties() {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'properties',
    where: { status: { equals: 'published' } },
    sort: 'title',
    depth: 1,
  })
  return result.docs
}

/**
 * Fetch area guide entries, optionally filtered by category
 */
export async function getAreaGuide(category?: string) {
  const payload = await getPayloadClient()
  const where: Where = { status: { equals: 'published' } }
  if (category) {
    where.category = { equals: category }
  }
  const result = await payload.find({
    collection: 'area-guide',
    where,
    sort: 'title',
    depth: 1,
    limit: 50,
  })
  return result.docs
}

/**
 * Fetch a page by slug
 */
export async function getPageBySlug(slug: string) {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'pages',
    where: {
      slug: { equals: slug },
      status: { equals: 'published' },
    },
    limit: 1,
    depth: 2,
  })
  return result.docs[0] || null
}

/**
 * Fetch site settings global
 */
export async function getSiteSettings() {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'site-settings' })
}

/**
 * Submit an enquiry
 */
export async function createEnquiry(data: {
  name: string
  email: string
  phone?: string
  message: string
  arrivalDate?: string
  departureDate?: string
  guests?: number
  property?: string
  source?: string
}) {
  const payload = await getPayloadClient()
  return payload.create({
    collection: 'enquiries',
    data,
  })
}
