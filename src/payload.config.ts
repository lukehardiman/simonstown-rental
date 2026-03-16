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
            collections: {
              media: true,
              'property-images': true,
            },
            bucket: process.env.S3_BUCKET,
            config: {
              credentials: {
                accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
                secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
              },
              region: process.env.S3_REGION || 'us-east-1',
              ...(process.env.S3_ENDPOINT && { endpoint: process.env.S3_ENDPOINT }),
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
