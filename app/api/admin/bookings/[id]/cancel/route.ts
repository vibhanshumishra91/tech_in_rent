import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const token = process.env.CALENDLY_API_TOKEN;
  if (!token) {
    return NextResponse.json({ error: 'CALENDLY_API_TOKEN not set' }, { status: 500 });
  }

  const { id } = await context.params;
  const body = await request.json().catch(() => ({}));
  const reason = body.reason || 'Cancelled by admin';

  try {
    const res = await fetch(
      `https://api.calendly.com/scheduled_events/${id}/cancellation`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reason }),
      }
    );

    const text = await res.text();
    console.log('[cancel] Calendly status:', res.status, 'body:', text);

    if (!res.ok) {
      let msg = 'Failed to cancel booking';
      try { msg = JSON.parse(text)?.message || msg; } catch {}
      return NextResponse.json({ error: msg, calendly_status: res.status }, { status: res.status });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[cancel] network error:', err);
    return NextResponse.json({ error: 'Failed to cancel booking' }, { status: 500 });
  }
}
