import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { syncClientToQuickBooks, syncAllClientsToQuickBooks } from '@/lib/quickbooks/sync'

export async function POST(request: NextRequest) {
  try {
    const payload = await getPayload({ config })
    const body = await request.json()
    const { clientId, syncAll, forceSync } = body

    if (syncAll) {
      // Get all clients for force sync, or just unsynced ones
      let clients
      if (forceSync) {
        console.log('Force syncing ALL clients...')
        clients = await payload.find({
          collection: 'clients',
          limit: 1000,
        })
        console.log(`Found ${clients.docs.length} total clients to force sync`)
      } else {
        // Sync all clients that need syncing
        const results = await syncAllClientsToQuickBooks(payload)
        return NextResponse.json({
          success: true,
          message: `Synced ${results.synced} clients, ${results.errors} errors`,
          results,
        })
      }

      // Force sync all clients
      if (forceSync && clients) {
        const results = {
          total: clients.docs.length,
          synced: 0,
          errors: 0,
          details: [] as any[],
        }

        for (const client of clients.docs) {
          try {
            const result = await syncClientToQuickBooks(payload, client as any)
            if (result.success) {
              results.synced++
            } else {
              results.errors++
            }
            results.details.push({
              clientId: client.id,
              clientName: client.name,
              ...result,
            })
          } catch (err: any) {
            results.errors++
            results.details.push({
              clientId: client.id,
              clientName: client.name,
              success: false,
              error: err.message,
            })
          }
        }

        return NextResponse.json({
          success: true,
          message: `Force synced ${results.synced} clients, ${results.errors} errors`,
          results,
        })
      }
    } else if (clientId) {
      // Sync single client
      const client = await payload.findByID({
        collection: 'clients',
        id: clientId,
      })

      const result = await syncClientToQuickBooks(payload, client as any)
      return NextResponse.json(result)
    } else {
      return NextResponse.json(
        { error: 'Please provide clientId or set syncAll to true' },
        { status: 400 }
      )
    }
  } catch (error: any) {
    console.error('QuickBooks sync error:', error)
    return NextResponse.json(
      { error: 'Failed to sync with QuickBooks', details: error.message },
      { status: 500 }
    )
  }
}
