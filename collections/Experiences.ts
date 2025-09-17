import type { CollectionConfig } from 'payload'

export const Experiences: CollectionConfig = {
  slug: 'experiences',
  admin: {
    useAsTitle: 'title',
  },
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'company', type: 'text', required: true },
    { name: 'location', type: 'text' },
    { name: 'startDate', type: 'date', required: true },
    { name: 'endDate', type: 'date' },
    {
      name: 'description',
      type: 'array',
      label: 'Description Bullets',
      fields: [{ name: 'text', type: 'text' }],
    },
    {
      name: 'technologies',
      type: 'array',
      fields: [{ name: 'name', type: 'text' }],
    },
  ],
}
