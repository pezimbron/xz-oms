import type { CollectionConfig } from 'payload'

export const Notifications: CollectionConfig = {
  slug: 'notifications',
  access: {
    read: ({ req: { user } }) => {
      if (!user) return false
      // Users can only read their own notifications
      return {
        user: {
          equals: user.id,
        },
      }
    },
    create: () => true, // System can create notifications
    update: ({ req: { user } }) => {
      if (!user) return false
      // Users can only update their own notifications (mark as read)
      return {
        user: {
          equals: user.id,
        },
      }
    },
    delete: ({ req: { user } }) => {
      if (!user) return false
      return {
        user: {
          equals: user.id,
        },
      }
    },
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'user', 'read', 'createdAt'],
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      index: true,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Info', value: 'info' },
        { label: 'Success', value: 'success' },
        { label: 'Warning', value: 'warning' },
        { label: 'Error', value: 'error' },
      ],
      defaultValue: 'info',
    },
    {
      name: 'read',
      type: 'checkbox',
      defaultValue: false,
      index: true,
    },
    {
      name: 'relatedJob',
      type: 'relationship',
      relationTo: 'jobs',
      admin: {
        description: 'Link to related job if applicable',
      },
    },
    {
      name: 'actionUrl',
      type: 'text',
      admin: {
        description: 'URL to navigate to when notification is clicked',
      },
    },
  ],
}
