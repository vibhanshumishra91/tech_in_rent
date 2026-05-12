import { NextResponse } from 'next/server';

const USER_URI = 'https://api.calendly.com/users/98140014-4787-43a2-b808-246450c2aa4d';

export async function GET() {
  const token = process.env.CALENDLY_API_TOKEN;

  if (!token) {
    return NextResponse.json({ bookings: [], error: 'CALENDLY_API_TOKEN not set' });
  }

  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  try {
    const eventsRes = await fetch(
      `https://api.calendly.com/scheduled_events?user=${USER_URI}&count=50&sort=start_time:desc`,
      { headers }
    );

    if (!eventsRes.ok) {
      const err = await eventsRes.json();
      return NextResponse.json({ bookings: [], error: err.message || 'Failed to fetch events' });
    }

    const eventsData = await eventsRes.json();

    const bookings = await Promise.all(
      (eventsData.collection || []).map(async (event: any) => {
        const eventUuid = event.uri.split('/').pop();
        const inviteesRes = await fetch(
          `https://api.calendly.com/scheduled_events/${eventUuid}/invitees`,
          { headers }
        );
        const inviteesData = inviteesRes.ok ? await inviteesRes.json() : { collection: [] };
        const invitee = inviteesData.collection?.[0];

        return {
          _id: event.uri,
          name: invitee?.name || 'Unknown',
          email: invitee?.email || '',
          event_type: event.name,
          start_time: event.start_time,
          end_time: event.end_time,
          status: event.status === 'active' ? 'confirmed' : event.status === 'canceled' ? 'cancelled' : event.status,
          created_at: event.created_at,
          timezone: invitee?.timezone || '',
          questions_and_answers: invitee?.questions_and_answers || [],
          cancel_url: invitee?.cancel_url || '',
          reschedule_url: invitee?.reschedule_url || '',
          meeting_link: event.location?.join_url || '',
          rescheduled: invitee?.rescheduled || false,
        };
      })
    );

    return NextResponse.json({ bookings });
  } catch (error) {
    console.error('Calendly API error:', error);
    return NextResponse.json({ bookings: [], error: 'Failed to fetch bookings' });
  }
}
