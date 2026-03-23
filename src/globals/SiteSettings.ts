import type { GlobalConfig } from 'payload'
import { revalidateSiteSettings } from '@/hooks/revalidate'
import { isLoggedIn } from '@/lib/access'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  admin: {
    group: 'Admin',
  },
  access: {
    read: () => true,
    update: isLoggedIn,
  },
  hooks: {
    afterChange: [revalidateSiteSettings],
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      defaultValue: 'Simon\'s Town Rental',
    },
    {
      name: 'tagline',
      type: 'text',
      defaultValue: 'Holiday accommodation on the Cape Peninsula',
    },
    {
      name: 'contact',
      type: 'group',
      label: 'Contact Details',
      fields: [
        { name: 'email', type: 'email', defaultValue: 'info@simonstownrental.com' },
        { name: 'phone', type: 'text' },
        { name: 'whatsapp', type: 'text', label: 'WhatsApp Number' },
      ],
    },
    {
      name: 'social',
      type: 'group',
      label: 'Social Media',
      fields: [
        { name: 'instagram', type: 'text' },
        { name: 'facebook', type: 'text' },
      ],
    },
    {
      name: 'homepageHeroImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Homepage Hero Image',
    },
    {
      name: 'seo',
      type: 'group',
      label: 'Default SEO',
      fields: [
        {
          name: 'defaultTitle',
          type: 'text',
          defaultValue: 'Simon\'s Town Rental — Holiday Accommodation, Cape Peninsula',
        },
        {
          name: 'defaultDescription',
          type: 'textarea',
          defaultValue: 'Boutique self-catering holiday rental in historic Simon\'s Town, South Africa. Mountain views, harbour charm, and the Cape Peninsula on your doorstep.',
        },
        {
          name: 'ogImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Default Social Share Image',
        },
      ],
    },
    {
      name: 'announcement',
      type: 'group',
      label: 'Site Announcement Banner',
      fields: [
        { name: 'enabled', type: 'checkbox', defaultValue: false },
        { name: 'text', type: 'text' },
        { name: 'link', type: 'text' },
      ],
    },
  ],
}
