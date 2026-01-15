import type { CollectionConfig } from 'payload'

import { isAdmin } from '../access/isAdmin'

export const Clients: CollectionConfig = {
  slug: 'clients',
  access: {
    create: isAdmin,
    read: ({ req: { user } }) => {
      if (!user) return false
      // Admin/Ops/Sales see all clients
      if (['super-admin', 'sales-admin', 'ops-manager'].includes(user.role)) {
        return true
      }
      // Techs can see clients (for job context)
      if (user.role === 'tech') {
        return true
      }
      // Client-partners see only themselves (would need email matching logic)
      return false
    },
    update: isAdmin,
    delete: isAdmin,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'clientType', 'billingPreference'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'clientType',
      type: 'select',
      required: true,
      defaultValue: 'retail',
      options: [
        { label: 'Retail', value: 'retail' },
        { label: 'Outsourcing Partner', value: 'outsourcing-partner' },
      ],
    },
    {
      name: 'billingPreference',
      type: 'select',
      required: true,
      defaultValue: 'immediate',
      options: [
        { label: 'Immediate', value: 'immediate' },
        { label: 'Weekly Batch', value: 'weekly-batch' },
        { label: 'Monthly Batch', value: 'monthly-batch' },
        { label: 'Payment First', value: 'payment-first' },
      ],
    },
    {
      name: 'email',
      type: 'email',
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'companyName',
      type: 'text',
    },
    {
      name: 'billingAddress',
      type: 'textarea',
    },
    {
      name: 'notes',
      type: 'textarea',
    },
    {
      name: 'instructionTemplate',
      type: 'textarea',
      label: 'Client-Specific Instruction Template',
      admin: {
        description: 'Client-specific instructions that will auto-populate in the "General Instructions for Tech" field when this client is selected for a job. Use for recurring client requirements (e.g., "Always call POC 30 min before arrival").',
      },
    },
    {
      name: 'defaultWorkflow',
      type: 'select',
      label: 'Default Workflow Type',
      admin: {
        description: 'Default workflow that will be assigned to new jobs for this client. Can be overridden per job.',
      },
      options: [
        { label: 'Outsourced: Scan & Upload to Client', value: 'outsourced-scan-upload-client' },
        { label: 'Outsourced: Scan & Transfer', value: 'outsourced-scan-transfer' },
        { label: 'Outsourced: Scan, Survey & Images', value: 'outsourced-scan-survey-images' },
        { label: 'Direct: Scan Hosted by Us', value: 'direct-scan-hosted' },
        { label: 'Direct: Scan & Transfer', value: 'direct-scan-transfer' },
        { label: 'Direct: Scan + Floor Plan', value: 'direct-scan-floorplan' },
        { label: 'Direct: Scan + Floor Plan + Photos', value: 'direct-scan-floorplan-photos' },
        { label: 'Direct: Scan + As-Builts', value: 'direct-scan-asbuilts' },
      ],
    },
    {
      name: 'invoicingPreferences',
      type: 'group',
      label: 'Invoicing Preferences',
      fields: [
        {
          name: 'terms',
          type: 'select',
          label: 'Payment Terms',
          defaultValue: 'net-30',
          options: [
            { label: 'Due on Receipt', value: 'due-on-receipt' },
            { label: 'Net 15', value: 'net-15' },
            { label: 'Net 30', value: 'net-30' },
            { label: 'Net 45', value: 'net-45' },
            { label: 'Net 60', value: 'net-60' },
          ],
          admin: {
            description: 'Default payment terms for invoices',
          },
        },
        {
          name: 'batchDay',
          type: 'number',
          label: 'Batch Invoice Day',
          admin: {
            description: 'For weekly batch: 1=Monday, 7=Sunday. For monthly batch: day of month (1-31)',
            condition: (data) => data.billingPreference === 'weekly-batch' || data.billingPreference === 'monthly-batch',
          },
        },
        {
          name: 'invoiceNotes',
          type: 'textarea',
          label: 'Default Invoice Notes',
          admin: {
            description: 'Notes that will appear on all invoices for this client',
          },
        },
        {
          name: 'autoApprove',
          type: 'checkbox',
          label: 'Auto-Approve Invoices',
          defaultValue: false,
          admin: {
            description: 'Skip manual approval and automatically create draft invoices in QuickBooks',
          },
        },
      ],
    },
    {
      name: 'integrations',
      type: 'group',
      label: 'External Integrations',
      fields: [
        {
          name: 'quickbooks',
          type: 'group',
          label: 'QuickBooks',
          fields: [
            {
              name: 'customerId',
              type: 'text',
              label: 'QuickBooks Customer ID',
              admin: {
                readOnly: true,
                description: 'Auto-populated when synced with QuickBooks',
              },
            },
            {
              name: 'syncStatus',
              type: 'select',
              label: 'Sync Status',
              defaultValue: 'not-synced',
              options: [
                { label: 'Not Synced', value: 'not-synced' },
                { label: 'Synced', value: 'synced' },
                { label: 'Error', value: 'error' },
                { label: 'Pending', value: 'pending' },
              ],
              admin: {
                readOnly: true,
              },
            },
            {
              name: 'lastSyncedAt',
              type: 'date',
              label: 'Last Synced',
              admin: {
                readOnly: true,
                date: {
                  pickerAppearance: 'dayAndTime',
                },
              },
            },
            {
              name: 'syncError',
              type: 'textarea',
              label: 'Sync Error Message',
              admin: {
                readOnly: true,
                condition: (data) => data?.integrations?.quickbooks?.syncStatus === 'error',
              },
            },
          ],
        },
        {
          name: 'hubspot',
          type: 'group',
          label: 'HubSpot',
          fields: [
            {
              name: 'contactId',
              type: 'text',
              label: 'HubSpot Contact ID',
              admin: {
                readOnly: true,
                description: 'Auto-populated when synced with HubSpot',
              },
            },
            {
              name: 'syncStatus',
              type: 'select',
              label: 'Sync Status',
              defaultValue: 'not-synced',
              options: [
                { label: 'Not Synced', value: 'not-synced' },
                { label: 'Synced', value: 'synced' },
                { label: 'Error', value: 'error' },
                { label: 'Pending', value: 'pending' },
              ],
              admin: {
                readOnly: true,
              },
            },
            {
              name: 'lastSyncedAt',
              type: 'date',
              label: 'Last Synced',
              admin: {
                readOnly: true,
                date: {
                  pickerAppearance: 'dayAndTime',
                },
              },
            },
            {
              name: 'syncError',
              type: 'textarea',
              label: 'Sync Error Message',
              admin: {
                readOnly: true,
                condition: (data) => data?.integrations?.hubspot?.syncStatus === 'error',
              },
            },
          ],
        },
      ],
    },
  ],
}
