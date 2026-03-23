import type { CollectionConfig } from 'payload'
import { isLoggedIn } from '@/lib/access'

export const PropertyImages: CollectionConfig = {
  slug: 'property-images',
  labels: {
    singular: 'Property Image',
    plural: 'Property Images',
  },
  admin: {
    group: 'Media',
  },
  access: {
    read: () => true,
    create: isLoggedIn,
    update: isLoggedIn,
    delete: isLoggedIn,
  },
  upload: {
    staticDir: '../public/images/property',
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/avif'],
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        crop: 'centre',
      },
      {
        name: 'card',
        width: 800,
        height: 600,
        crop: 'centre',
      },
      {
        name: 'hero',
        width: 1920,
        height: 1080,
        crop: 'centre',
      },
      {
        name: 'og',
        width: 1200,
        height: 630,
        crop: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'Alt Text',
      admin: {
        description: 'Describe the image for accessibility and SEO',
      },
    },
  ],
}
