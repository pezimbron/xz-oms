import type { Field } from 'payload'

export const invoicingFields: Field[] = [
  {
    name: 'invoicing',
    type: 'group',
    label: 'Invoice Information',
    fields: [
      {
        name: 'status',
        type: 'select',
        label: 'Invoice Status',
        defaultValue: 'not-invoiced',
        options: [
          { label: 'Not Invoiced', value: 'not-invoiced' },
          { label: 'Ready to Invoice', value: 'ready' },
          { label: 'Pending Approval', value: 'pending-approval' },
          { label: 'Draft Created', value: 'draft' },
          { label: 'Sent to Client', value: 'sent' },
          { label: 'Partially Paid', value: 'partial' },
          { label: 'Paid', value: 'paid' },
          { label: 'Overdue', value: 'overdue' },
        ],
        admin: {
          description: 'Current status of invoicing for this job',
        },
      },
      {
        name: 'quickbooksInvoiceId',
        type: 'text',
        label: 'QuickBooks Invoice ID',
        admin: {
          readOnly: true,
          description: 'Auto-populated when invoice is created in QuickBooks',
        },
      },
      {
        name: 'invoiceNumber',
        type: 'text',
        label: 'Invoice Number',
        admin: {
          readOnly: true,
          description: 'Invoice number from QuickBooks',
        },
      },
      {
        name: 'invoiceDate',
        type: 'date',
        label: 'Invoice Date',
        admin: {
          date: {
            pickerAppearance: 'dayOnly',
          },
        },
      },
      {
        name: 'dueDate',
        type: 'date',
        label: 'Due Date',
        admin: {
          date: {
            pickerAppearance: 'dayOnly',
          },
        },
      },
      {
        name: 'invoiceAmount',
        type: 'number',
        label: 'Invoice Amount',
        admin: {
          description: 'Total amount on the invoice',
        },
      },
      {
        name: 'paidAmount',
        type: 'number',
        label: 'Amount Paid',
        defaultValue: 0,
        admin: {
          description: 'Amount received from client',
        },
      },
      {
        name: 'balance',
        type: 'number',
        label: 'Balance Due',
        admin: {
          readOnly: true,
          description: 'Calculated: Invoice Amount - Paid Amount',
        },
      },
      {
        name: 'approvedBy',
        type: 'relationship',
        relationTo: 'users',
        label: 'Approved By',
        admin: {
          readOnly: true,
          description: 'User who approved this invoice for creation',
        },
      },
      {
        name: 'approvedAt',
        type: 'date',
        label: 'Approved At',
        admin: {
          readOnly: true,
          date: {
            pickerAppearance: 'dayAndTime',
          },
        },
      },
      {
        name: 'notes',
        type: 'textarea',
        label: 'Invoice Notes',
        admin: {
          description: 'Internal notes about this invoice',
        },
      },
    ],
  },
  {
    name: 'invoiceLineItems',
    type: 'array',
    label: 'Invoice Line Items',
    admin: {
      description: 'Products and services for this job that will appear on the invoice',
    },
    fields: [
      {
        name: 'description',
        type: 'text',
        required: true,
        label: 'Description',
      },
      {
        name: 'quantity',
        type: 'number',
        required: true,
        defaultValue: 1,
        label: 'Quantity',
      },
      {
        name: 'rate',
        type: 'number',
        required: true,
        label: 'Rate/Price',
      },
      {
        name: 'amount',
        type: 'number',
        label: 'Amount',
        admin: {
          readOnly: true,
          description: 'Calculated: Quantity × Rate',
        },
      },
    ],
  },
]
