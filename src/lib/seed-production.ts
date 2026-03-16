/**
 * Production seed script — uploads all media to S3 via the Payload local API.
 *
 * Run locally with production env vars set:
 *   DATABASE_URL=... S3_BUCKET=... S3_REGION=... S3_ACCESS_KEY_ID=... \
 *   S3_SECRET_ACCESS_KEY=... pnpm seed:production
 *
 * What it does:
 *   ① Deletes all existing property-images documents
 *   ② Uploads all JPGs from public/images/property/13-thomas-street/ as PropertyImages
 *   ③ Reattaches them to the Thomas Street House property gallery
 *   ④ Deletes all existing media documents for the area images
 *   ⑤ Uploads all images from public/images/area/ to the Media collection
 */

import 'dotenv/config'

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { getPayload } from 'payload'
import config from '@payload-config'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PROPERTY_IMAGES_DIR = path.resolve(__dirname, '../../public/images/property/13-thomas-street')
const AREA_IMAGES_DIR     = path.resolve(__dirname, '../../public/images/area')
const PROPERTY_SLUG       = 'thomas-street-house'

// ── Helpers ───────────────────────────────────────────────────────────────────

/** "13-thomas-street-7.jpg" → "13 Thomas Street — photo 7" */
function altFromPropertyFilename(filename: string): string {
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

/** "kalk-bay-harbour.jpg" → "Kalk Bay Harbour" */
function altFromAreaFilename(filename: string): string {
  const base = path.basename(filename, path.extname(filename))
  return base.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}

/** Natural sort by trailing integer: "photo-2" before "photo-10". */
function numericalSort(a: string, b: string): number {
  const num = (s: string) => parseInt(s.match(/(\d+)\.[^.]+$/)?.[1] ?? '0', 10)
  return num(a) - num(b)
}

function mimeType(filename: string): string {
  const ext = path.extname(filename).toLowerCase()
  const map: Record<string, string> = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.webp': 'image/webp',
    '.avif': 'image/avif',
  }
  return map[ext] ?? 'image/jpeg'
}

function readImages(dir: string): string[] {
  return fs
    .readdirSync(dir)
    .filter((f) => /\.(jpg|jpeg|png|webp|avif)$/i.test(f))
    .sort(numericalSort)
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function seed() {
  if (!process.env.S3_BUCKET) {
    console.error('\n✗  S3_BUCKET is not set. Run this script with production env vars.\n')
    process.exit(1)
  }

  const payload = await getPayload({ config })

  // ──────────────────────────────────────────────────────────────────────────
  // PART 1 — Property images
  // ──────────────────────────────────────────────────────────────────────────

  console.log('\n━━━ Property Images ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

  // ① Delete existing property-images

  console.log('① Deleting existing property-images…')

  const existingPropertyImages = await payload.find({
    collection: 'property-images',
    pagination: false,
    limit: 1000,
    depth: 0,
    overrideAccess: true,
  })

  for (const doc of existingPropertyImages.docs) {
    await payload.delete({ collection: 'property-images', id: doc.id, overrideAccess: true })
  }

  console.log(`   Deleted ${existingPropertyImages.docs.length} document(s).`)

  // ② Upload property images

  if (!fs.existsSync(PROPERTY_IMAGES_DIR)) {
    console.error(`\n✗  Directory not found: ${PROPERTY_IMAGES_DIR}`)
    process.exit(1)
  }

  const propertyFiles = readImages(PROPERTY_IMAGES_DIR)

  if (propertyFiles.length === 0) {
    console.error(`\n✗  No images found in ${PROPERTY_IMAGES_DIR}`)
    process.exit(1)
  }

  console.log(`\n② Uploading ${propertyFiles.length} property images…`)

  const uploadedPropertyIds: string[] = []

  for (const filename of propertyFiles) {
    const filePath = path.join(PROPERTY_IMAGES_DIR, filename)
    const data = fs.readFileSync(filePath)
    const { size } = fs.statSync(filePath)
    const alt = altFromPropertyFilename(filename)

    process.stdout.write(`   ${filename} … `)

    const doc = await payload.create({
      collection: 'property-images',
      data: { alt },
      file: { data, mimetype: mimeType(filename), name: filename, size },
      overrideAccess: true,
    })

    uploadedPropertyIds.push(String(doc.id))
    process.stdout.write(`✓  (id: ${doc.id})\n`)
  }

  // ③ Reattach to property gallery

  console.log(`\n③ Looking up property "${PROPERTY_SLUG}"…`)

  const { docs: propertyDocs } = await payload.find({
    collection: 'properties',
    where: { slug: { equals: PROPERTY_SLUG } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  })

  if (!propertyDocs[0]) {
    console.error(
      `\n✗  Property "${PROPERTY_SLUG}" not found.` +
      `\n   Uploaded IDs for manual use: ${uploadedPropertyIds.join(', ')}`,
    )
    process.exit(1)
  }

  const property = propertyDocs[0]
  console.log(`   Found: "${property.title}" (id: ${property.id})`)
  console.log(`\n   Attaching ${uploadedPropertyIds.length} images to gallery…`)

  await payload.update({
    collection: 'properties',
    id: property.id,
    data: { gallery: uploadedPropertyIds.map((id) => ({ image: id })) },
    overrideAccess: true,
  })

  console.log(`   ✓  Gallery updated.`)

  // ──────────────────────────────────────────────────────────────────────────
  // PART 2 — Area guide / media images
  // ──────────────────────────────────────────────────────────────────────────

  console.log('\n━━━ Area Media Images ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

  if (!fs.existsSync(AREA_IMAGES_DIR)) {
    console.warn(`   ⚠  Area images directory not found: ${AREA_IMAGES_DIR}`)
    console.warn(`   Skipping media upload.\n`)
  } else {
    const areaFiles = readImages(AREA_IMAGES_DIR)

    if (areaFiles.length === 0) {
      console.warn(`   ⚠  No images found in ${AREA_IMAGES_DIR}. Skipping.\n`)
    } else {
      // ④ Delete existing media docs whose filename matches an area image

      console.log('④ Checking for existing media documents to replace…')

      const existingMedia = await payload.find({
        collection: 'media',
        pagination: false,
        limit: 1000,
        depth: 0,
        overrideAccess: true,
      })

      // Only delete docs whose filename matches one of our area images
      const areaFileSet = new Set(areaFiles)
      const toDelete = existingMedia.docs.filter(
        (doc) => doc.filename && areaFileSet.has(doc.filename),
      )

      for (const doc of toDelete) {
        await payload.delete({ collection: 'media', id: doc.id, overrideAccess: true })
      }

      console.log(`   Deleted ${toDelete.length} existing media document(s).`)

      // ⑤ Upload area images

      console.log(`\n⑤ Uploading ${areaFiles.length} area images…`)

      for (const filename of areaFiles) {
        const filePath = path.join(AREA_IMAGES_DIR, filename)
        const data = fs.readFileSync(filePath)
        const { size } = fs.statSync(filePath)
        const alt = altFromAreaFilename(filename)

        process.stdout.write(`   ${filename} … `)

        const doc = await payload.create({
          collection: 'media',
          data: { alt },
          file: { data, mimetype: mimeType(filename), name: filename, size },
          overrideAccess: true,
        })

        process.stdout.write(`✓  (id: ${doc.id})\n`)
      }
    }
  }

  // ──────────────────────────────────────────────────────────────────────────

  console.log(`\n✓  Production seed complete.\n`)
  console.log(`   Property images : ${uploadedPropertyIds.length}`)
  console.log(`   S3 bucket       : ${process.env.S3_BUCKET}\n`)

  process.exit(0)
}

seed().catch((err) => {
  console.error('\n✗  Seed failed:', err)
  process.exit(1)
})
