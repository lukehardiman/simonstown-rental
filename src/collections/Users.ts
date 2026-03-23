import type { CollectionConfig } from 'payload'
import { isLoggedIn } from '@/lib/access'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  access: {
    read: isLoggedIn,
    create: isLoggedIn,
    update: isLoggedIn,
    delete: isLoggedIn,
    admin: ({ req }) => !!req.user,
  },
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
}
