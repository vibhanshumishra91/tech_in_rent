import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/connection';
import Booking from '@/lib/db/models/Booking';

export async function GET() {
  return NextResponse.json({ status: 'Calendly webhook endpoint is active. Waiting for POST events from Calendly.' });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { event, payload } = body;

    await connectDB();

    if (event === 'invitee.created') {
      const inviteeUuid = payload?.uri?.split('/').pop();
      await Booking.findOneAndUpdate(
        { invitee_uuid: inviteeUuid },
        {
          name: payload?.name || 'Unknown',
          email: payload?.email || '',
          event_type: payload?.scheduled_event?.name || 'Consultation Call',
          start_time: payload?.scheduled_event?.start_time,
          end_time: payload?.scheduled_event?.end_time,
          status: 'confirmed',
          invitee_uuid: inviteeUuid,
        },
        { upsert: true, new: true }
      );
    }

    if (event === 'invitee.canceled') {
      const inviteeUuid = payload?.uri?.split('/').pop();
      await Booking.findOneAndUpdate(
        { invitee_uuid: inviteeUuid },
        { status: 'cancelled' }
      );
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Calendly webhook error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
