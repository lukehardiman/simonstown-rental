import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Properties } from './collections/Properties'
import { PropertyImages } from './collections/PropertyImages'
import { AreaGuide } from './collections/AreaGuide'
import { Pages } from './collections/Pages'
import { Enquiries } from './collections/Enquiries'
import { SiteSettings } from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: ' — Simon\'s Town Rental',
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Properties, PropertyImages, AreaGuide, Pages, Media, Enquiries, Users],
  globals: [SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || '',
  }),
  sharp,
  plugins: [
    ...(process.env.S3_BUCKET
      ? [
          s3Storage({
            // generateFileURL is set per-collection when S3_PUBLIC_URL is present.
            // This separates the R2 public serving URL (pub-xxx.r2.dev) from the
            // S3-compatible API endpoint used for uploads (accountId.r2.cloudflarestorage.com).
            // Without this, the adapter's built-in generateURL would embed the API
            // endpoint hostname in stored URLs, making them inaccessible publicly.
            collections: {
              media: process.env.S3_PUBLIC_URL
                ? {
                    generateFileURL: ({ filename, prefix }) => {
                      const base = process.env.S3_PUBLIC_URL!.replace(/\/$/, '')
                      return prefix ? `${base}/${prefix}/${filename}` : `${base}/${filename}`
                    },
                  }
                : true,
              'property-images': process.env.S3_PUBLIC_URL
                ? {
                    generateFileURL: ({ filename, prefix }) => {
                      const base = process.env.S3_PUBLIC_URL!.replace(/\/$/, '')
                      return prefix ? `${base}/${prefix}/${filename}` : `${base}/${filename}`
                    },
                  }
                : true,
            },
            bucket: process.env.S3_BUCKET,
            config: {
              credentials: {
                accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
                secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
              },
              region: process.env.S3_REGION || 'auto',
              // S3_ENDPOINT: the R2 account API endpoint for upload/delete operations.
              // e.g. https://<accountId>.r2.cloudflarestorage.com
              ...(process.env.S3_ENDPOINT && { endpoint: process.env.S3_ENDPOINT }),
              forcePathStyle: true,
            },
          }),
        ]
      : []),
    seoPlugin({
      collections: ['properties', 'area-guide', 'pages'],
      uploadsCollection: 'media',
      generateTitle: ({ doc }) =>
        `${doc?.title || 'Simon\'s Town Rental'} — Holiday Accommodation, Cape Peninsula`,
      generateDescription: ({ doc }) =>
        doc?.excerpt || 'Boutique holiday rental in historic Simon\'s Town on South Africa\'s Cape Peninsula. Self-catering accommodation with mountain and harbour views.',
      generateURL: ({ doc }) =>
        `${process.env.NEXT_PUBLIC_SITE_URL || 'https://simonstownrental.com'}/${doc?.slug || ''}`,
    }),
  ],
  serverURL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  cors: [process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'],
})
