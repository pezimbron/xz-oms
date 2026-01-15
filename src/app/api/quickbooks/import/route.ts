import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { importCustomersFromQuickBooks } from '@/lib/quickbooks/import'

export async function POST(request: NextRequest) {
  try {
    const payload = await getPayload({ config })
    
    console.log('Starting QuickBooks import...')
    const results = await importCustomersFromQuickBooks(payload)
    
    return NextResponse.json({
      success: true,
      message: `Imported ${results.imported} new clients, updated ${results.updated} existing clients. ${results.errors} errors.`,
      results,
    })
  } catch (error: any) {
    console.error('QuickBooks import error:', error)
    return NextResponse.json(
      { error: 'Failed to import from QuickBooks', details: error.message },
      { status: 500 }
    )
  }
}
