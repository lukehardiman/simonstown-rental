import type { CollectionConfig } from 'payload'
import { isLoggedIn } from '@/lib/access'

export const Enquiries: CollectionConfig = {
  slug: 'enquiries',
  labels: {
    singular: 'Enquiry',
    plural: 'Enquiries',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'property', 'arrivalDate', 'status', 'createdAt'],
    group: 'Enquiries',
  },
  access: {
    read: isLoggedIn,
    create: () => true, // Public can submit via the enquiry form
    update: isLoggedIn,
    delete: isLoggedIn,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'property',
      type: 'relationship',
      relationTo: 'properties',
      label: 'Property of Interest',
    },
    {
      name: 'arrivalDate',
      type: 'date',
      label: 'Preferred Arrival',
    },
    {
      name: 'departureDate',
      type: 'date',
      label: 'Preferred Departure',
    },
    {
      name: 'guests',
      type: 'number',
      label: 'Number of Guests',
      min: 1,
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
    },
    {
      name: 'source',
      type: 'select',
      defaultValue: 'website',
      options: [
        { label: 'Website', value: 'website' },
        { label: 'Google', value: 'google' },
        { label: 'Referral', value: 'referral' },
        { label: 'Other', value: 'other' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Responded', value: 'responded' },
        { label: 'Booked', value: 'booked' },
        { label: 'Declined', value: 'declined' },
      ],
      admin: { position: 'sidebar' },
    },
  ],
  hooks: {
    afterChange: [
      // TODO: Send email notification on new enquiry
      // Will wire up SMTP when email config is ready
    ],
  },
}
