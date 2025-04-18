import type { CollectionConfig } from 'payload'

export const TestData: CollectionConfig = {
  slug: 'testdata',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'note',
      type: 'text',
    },
    {
      name: 'metadata',
      type: 'json',
    },
  ],
}
