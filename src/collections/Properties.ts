import type { CollectionConfig } from 'payload'
import { revalidateProperty } from '@/hooks/revalidate'
import { isLoggedIn } from '@/lib/access'

export const Properties: CollectionConfig = {
  slug: 'properties',
  labels: {
    singular: 'Property',
    plural: 'Properties',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'sleeps', 'updatedAt'],
    group: 'Content',
  },
  access: {
    read: () => true,
    create: isLoggedIn,
    update: isLoggedIn,
    delete: isLoggedIn,
  },
  hooks: {
    afterChange: [revalidateProperty],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Property Name',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'Short Description',
      maxLength: 200,
      admin: {
        description: 'Used in cards, search results, and meta descriptions',
      },
    },
    // ── Hero ──
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Hero Image',
    },
    // ── Gallery ──
    {
      name: 'gallery',
      type: 'array',
      label: 'Photo Gallery',
      minRows: 1,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'property-images',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
        },
        {
          name: 'room',
          type: 'select',
          options: [
            { label: 'Exterior', value: 'exterior' },
            { label: 'Living Area', value: 'living' },
            { label: 'Kitchen', value: 'kitchen' },
            { label: 'Bedroom', value: 'bedroom' },
            { label: 'Bathroom', value: 'bathroom' },
            { label: 'Garden / Outdoor', value: 'outdoor' },
            { label: 'View', value: 'view' },
          ],
        },
      ],
    },
    // ── Details ──
    {
      name: 'details',
      type: 'group',
      label: 'Property Details',
      fields: [
        {
          name: 'sleeps',
          type: 'number',
          required: true,
          min: 1,
          max: 20,
        },
        {
          name: 'bedrooms',
          type: 'number',
          required: true,
          min: 1,
        },
        {
          name: 'bathrooms',
          type: 'number',
          required: true,
          min: 1,
        },
        {
          name: 'propertyType',
          type: 'select',
          options: [
            { label: 'House', value: 'house' },
            { label: 'Cottage', value: 'cottage' },
            { label: 'Apartment', value: 'apartment' },
          ],
        },
      ],
    },
    // ── Amenities ──
    {
      name: 'amenities',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'Wi-Fi', value: 'wifi' },
        { label: 'Air Conditioning', value: 'aircon' },
        { label: 'Fireplace', value: 'fireplace' },
        { label: 'Braai / BBQ', value: 'braai' },
        { label: 'Garden', value: 'garden' },
        { label: 'Mountain Views', value: 'mountain-views' },
        { label: 'Harbour Views', value: 'harbour-views' },
        { label: 'Parking', value: 'parking' },
        { label: 'Washing Machine', value: 'washing-machine' },
        { label: 'Dishwasher', value: 'dishwasher' },
        { label: 'Swimming Pool', value: 'pool' },
        { label: 'Pet Friendly', value: 'pet-friendly' },
        { label: 'Child Friendly', value: 'child-friendly' },
        { label: 'Self-Catering Kitchen', value: 'self-catering' },
        { label: 'Beach Towels', value: 'beach-towels' },
        { label: 'DStv / Streaming', value: 'tv' },
        { label: 'Alarm System', value: 'alarm' },
        { label: 'Load-shedding Backup', value: 'loadshedding' },
      ],
    },
    // ── Description (Rich Text) ──
    {
      name: 'description',
      type: 'richText',
      label: 'Full Description',
    },
    // ── Location ──
    {
      name: 'location',
      type: 'group',
      label: 'Location',
      fields: [
        {
          name: 'address',
          type: 'textarea',
          label: 'Street Address',
        },
        {
          name: 'latitude',
          type: 'number',
          admin: { step: 0.000001 },
        },
        {
          name: 'longitude',
          type: 'number',
          admin: { step: 0.000001 },
        },
        {
          name: 'distanceToBeach',
          type: 'text',
          label: 'Distance to Beach',
          admin: {
            description: 'e.g. "3-minute walk"',
          },
        },
        {
          name: 'distanceToTown',
          type: 'text',
          label: 'Distance to Town Centre',
        },
      ],
    },
    // ── Pricing ──
    {
      name: 'pricing',
      type: 'group',
      label: 'Pricing & Availability',
      fields: [
        {
          name: 'nightlyRate',
          type: 'number',
          label: 'Nightly Rate (ZAR)',
        },
        {
          name: 'weeklyRate',
          type: 'number',
          label: 'Weekly Rate (ZAR)',
        },
        {
          name: 'monthlyRate',
          type: 'number',
          label: 'Monthly Rate (ZAR)',
        },
        {
          name: 'minimumStay',
          type: 'number',
          label: 'Minimum Stay (nights)',
          defaultValue: 3,
        },
        {
          name: 'pricingNote',
          type: 'textarea',
          label: 'Pricing Notes',
          admin: {
            description: 'Seasonal variations, long-stay discounts, etc.',
          },
        },
      ],
    },
    // ── Structured Data for SEO ──
    {
      name: 'structuredData',
      type: 'group',
      label: 'Structured Data (Auto-generated)',
      admin: {
        description: 'Used for Google rich results — populated automatically',
        condition: () => false, // Hidden from admin, computed at build
      },
      fields: [
        {
          name: 'jsonLd',
          type: 'json',
        },
      ],
    },
  ],
}
