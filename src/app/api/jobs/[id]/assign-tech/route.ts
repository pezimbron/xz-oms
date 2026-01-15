import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const payload = await getPayload({ config })
    const body = await request.json()
    const { id } = await params
    const techId = body.techId

    console.log(`[Tech Assignment] Updating job ${id} with tech: ${techId}`)

    // Update just the tech field - use number for ID
    const updatedJob = await payload.update({
      collection: 'jobs',
      id: parseInt(id),
      data: {
        tech: techId ? parseInt(techId) : null,
      },
    })

    console.log(`[Tech Assignment] Successfully updated job ${id}`)
    return NextResponse.json(updatedJob)
  } catch (error: any) {
    console.error('[Tech Assignment] Error:', error)
    return NextResponse.json(
      { error: error.message, details: error },
      { status: 500 }
    )
  }
}
