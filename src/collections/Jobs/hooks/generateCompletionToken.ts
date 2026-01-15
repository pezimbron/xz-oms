import type { CollectionBeforeChangeHook } from 'payload'
import crypto from 'crypto'

export const generateCompletionToken: CollectionBeforeChangeHook = ({
  data,
  operation,
}) => {
  // Only generate token on create if not already set
  if (operation === 'create' && !data.completionToken) {
    // Generate a secure random token
    data.completionToken = crypto.randomBytes(32).toString('hex')
  }

  return data
}
