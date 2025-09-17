import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
  },
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'textarea' },
    {
      name: 'technologies',
      type: 'array',
      fields: [{ name: 'name', type: 'text' }],
    },
    { name: 'githubUrl', type: 'text' },
    { name: 'liveUrl', type: 'text' },
    { name: 'featured', type: 'checkbox', defaultValue: false },
    { name: 'startDate', type: 'date' },
    { name: 'endDate', type: 'date' },
    { name: 'image', type: 'upload', relationTo: 'media' },
  ],
}
