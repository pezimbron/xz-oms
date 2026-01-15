import type { CollectionBeforeChangeHook } from 'payload'

export const updateInvoiceStatus: CollectionBeforeChangeHook = ({
  data,
  originalDoc,
  operation,
}) => {
  // Only run on update operations
  if (operation !== 'update' || !originalDoc) {
    return data
  }

  // Check if status is changing to 'done'
  if (originalDoc.status !== 'done' && data.status === 'done') {
    // Automatically set invoice status to 'ready' when job is marked as done
    data.invoiceStatus = 'ready'
    console.log(`[Invoice Workflow] Job marked as ready to invoice`)
  }

  return data
}
