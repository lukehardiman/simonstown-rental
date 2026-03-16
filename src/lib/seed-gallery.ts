/**
 * Seed script — uploads property images for 13 Thomas Street.
 *
 * Usage:
 *   pnpm seed:gallery
 *
 * What it does:
 *   1. Deletes all existing property-images documents
 *   2. Reads all JPGs from public/images/property/13-thomas-street/ (sorted numerically)
 *   3. Uploads each as a PropertyImage via Payload local API (triggers image-size generation)
 *   4. Updates the 13-thomas-street property's gallery with all uploaded image IDs
 */

import 'dotenv/config'

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { getPayload } from 'payload'
import config from '@payload-config'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const IMAGES_DIR = path.resolve(__dirname, '../../public/images/property/13-thomas-street')
const PROPERTY_SLUG = '13-thomas-street-simonstown'

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Derive human-readable alt text from a filename.
 * "13-thomas-street-7.jpg" → "13 Thomas Street — photo 7"
 */
function altFromFilename(filename: string): string {
  const base = path.basename(filename, path.extname(filename))
  const match = base.match(/^(.+?)-(\d+)$/)
  if (match) {
    const label = match[1]
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ')
    return `${label} — photo ${match[2]}`
  }
  return base.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}

/**
 * Sort filenames by trailing integer so "2" comes before "10".
 */
function numericalSort(a: string, b: string): number {
  const num = (s: string) => parseInt(s.match(/(\d+)\.[^.]+$/)?.[1] ?? '0', 10)
  return num(a) - num(b)
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function seed() {
  const payload = await getPayload({ config })

  // ── 1. Delete all existing property-images ─────────────────────────────────

  console.log('\n① Deleting existing property-images…')

  const existing = await payload.find({
    collection: 'property-images',
    pagination: false,
    limit: 1000,
    depth: 0,
    overrideAccess: true,
  })

  for (const doc of existing.docs) {
    await payload.delete({
      collection: 'property-images',
      id: doc.id,
      overrideAccess: true,
    })
  }

  console.log(`   Deleted ${existing.docs.length} document(s).`)

  // ── 2. Discover and sort JPGs ───────────────────────────────────────────────

  if (!fs.existsSync(IMAGES_DIR)) {
    console.error(`\nImages directory not found: ${IMAGES_DIR}`)
    process.exit(1)
  }

  const files = fs
    .readdirSync(IMAGES_DIR)
    .filter((f) => /\.(jpg|jpeg)$/i.test(f))
    .sort(numericalSort)

  if (files.length === 0) {
    console.error('\nNo JPG files found in', IMAGES_DIR)
    process.exit(1)
  }

  console.log(`\n② Uploading ${files.length} images from ${IMAGES_DIR}`)

  // ── 3. Upload each image ────────────────────────────────────────────────────

  const uploadedIds: string[] = []

  for (const filename of files) {
    const filePath = path.join(IMAGES_DIR, filename)
    const data = fs.readFileSync(filePath)
    const { size } = fs.statSync(filePath)
    const alt = altFromFilename(filename)

    process.stdout.write(`   ${filename} … `)

    const doc = await payload.create({
      collection: 'property-images',
      data: { alt },
      file: {
        data,
        mimetype: 'image/jpeg',
        name: filename,
        size,
      },
      overrideAccess: true,
    })

    uploadedIds.push(String(doc.id))
    process.stdout.write(`✓  (id: ${doc.id})\n`)
  }

  // ── 4. Find the property ────────────────────────────────────────────────────

  console.log(`\n③ Looking up property "${PROPERTY_SLUG}"…`)

  const { docs } = await payload.find({
    collection: 'properties',
    where: { slug: { equals: PROPERTY_SLUG } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  })

  if (!docs[0]) {
    console.error(
      `\n   Property with slug "${PROPERTY_SLUG}" not found.` +
        `\n   Uploaded image IDs for manual use:\n   ${uploadedIds.join(', ')}`,
    )
    process.exit(1)
  }

  const property = docs[0]

  // ── 5. Update the gallery ───────────────────────────────────────────────────

  console.log(`   Found: "${property.title}" (id: ${property.id})`)
  console.log(`\n④ Updating gallery with ${uploadedIds.length} images…`)

  await payload.update({
    collection: 'properties',
    id: property.id,
    data: {
      gallery: uploadedIds.map((id) => ({ image: id })),
    },
    overrideAccess: true,
  })

  console.log(`\n✓  Done — ${uploadedIds.length} images seeded into "${property.title}".\n`)

  process.exit(0)
}

seed().catch((err) => {
  console.error('\nSeed failed:', err)
  process.exit(1)
})
