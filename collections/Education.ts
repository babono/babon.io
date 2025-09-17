import type { CollectionConfig } from 'payload'

export const Education: CollectionConfig = {
  slug: 'education',
  admin: {
    useAsTitle: 'institution',
  },
  access: { read: () => true },
  fields: [
    { name: 'institution', type: 'text', required: true },
    { name: 'degree', type: 'text', required: true },
    { name: 'field', type: 'text' },
    { name: 'startDate', type: 'date', required: true },
    { name: 'endDate', type: 'date', required: true },
    { name: 'gpa', type: 'text' },
    { name: 'description', type: 'textarea' },
  ],
}
