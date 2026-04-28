import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // First get user info
    const userRes = await fetch('https://api.calendly.com/users/me', {
      headers: {
        Authorization: `Bearer ${process.env.CALENDLY_API_TOKEN}`,
        'Content-Type': 'application/json'
      }
    })
    const userData = await userRes.json()
    const userUri = userData.resource?.uri

    // Then get scheduled events
    const eventsRes = await fetch(`https://api.calendly.com/scheduled_events?user=${userUri}&count=50`, {
      headers: {
        Authorization: `Bearer ${process.env.CALENDLY_API_TOKEN}`,
        'Content-Type': 'application/json'
      }
    })
    const eventsData = await eventsRes.json()

    const bookings = await Promise.all((eventsData.collection || []).map(async (event: any) => {
      // Get invitee details
      const eventUuid = event.uri.split('/').pop()
      const inviteesRes = await fetch(`https://api.calendly.com/scheduled_events/${eventUuid}/invitees`, {
        headers: {
          Authorization: `Bearer ${process.env.CALENDLY_API_TOKEN}`,
          'Content-Type': 'application/json'
        }
      })
      const inviteesData = await inviteesRes.json()
      const invitee = inviteesData.collection?.[0]

      return {
        _id: event.uri,
        name: invitee?.name || 'Unknown',
        email: invitee?.email || '',
        event_type: event.name,
        start_time: event.start_time,
        status: event.status,
        created_at: event.created_at
      }
    }))

    return NextResponse.json({ bookings })
  } catch (error) {
    console.error('Calendly API error:', error)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}