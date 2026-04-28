import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/connection';
import Booking from '@/lib/db/models/Booking';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    if (body.event === 'invitee.created') {
      await connectDB();
      const payload = body.payload;
      
      await Booking.create({
        name: payload.invitee.name,
        email: payload.invitee.email,
        event_type: payload.event_type.name,
        start_time: payload.event.start_time,
        end_time: payload.event.end_time,
        invitee_uuid: payload.invitee.uuid,
        status: 'confirmed'
      });
    }
    
    if (body.event === 'invitee.canceled') {
      await connectDB();
      await Booking.findOneAndUpdate(
        { invitee_uuid: body.payload.invitee.uuid },
        { status: 'cancelled' }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}