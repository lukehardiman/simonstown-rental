import type { CollectionConfig } from 'payload'
import { revalidateAreaGuide } from '@/hooks/revalidate'

export const AreaGuide: CollectionConfig = {
  slug: 'area-guide',
  labels: {
    singular: 'Area Guide Entry',
    plural: 'Area Guide',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'area', 'status'],
    group: 'Content',
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateAreaGuide],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Where to Eat', value: 'dining' },
        { label: 'Things to Do', value: 'activities' },
        { label: 'Nature & Wildlife', value: 'nature' },
        { label: 'Beaches', value: 'beaches' },
        { label: 'History & Culture', value: 'history' },
        { label: 'Shopping & Markets', value: 'shopping' },
        { label: 'Day Trips', value: 'daytrips' },
        { label: 'Practical Info', value: 'practical' },
      ],
    },
    {
      name: 'area',
      type: 'select',
      options: [
        { label: 'Simon\'s Town', value: 'simons-town' },
        { label: 'Boulders Beach', value: 'boulders' },
        { label: 'Fish Hoek', value: 'fish-hoek' },
        { label: 'Kalk Bay', value: 'kalk-bay' },
        { label: 'Muizenberg', value: 'muizenberg' },
        { label: 'Cape Point', value: 'cape-point' },
        { label: 'Noordhoek', value: 'noordhoek' },
        { label: 'Constantia', value: 'constantia' },
        { label: 'Wider Cape Town', value: 'cape-town' },
      ],
    },
    {
      name: 'excerpt',
      type: 'textarea',
      maxLength: 200,
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'content',
      type: 'richText',
    },
    {
      name: 'insiderTip',
      type: 'textarea',
      label: 'Insider Tip',
      admin: {
        description: 'A personal recommendation from the Hardiman family — what locals know',
      },
    },
    {
      name: 'location',
      type: 'group',
      fields: [
        { name: 'latitude', type: 'number', admin: { step: 0.000001 } },
        { name: 'longitude', type: 'number', admin: { step: 0.000001 } },
        { name: 'website', type: 'text' },
        { name: 'phone', type: 'text' },
      ],
    },
  ],
}
