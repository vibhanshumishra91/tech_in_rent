import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  event_type: String,
  start_time: String,
  end_time: String,
  status: { type: String, default: 'confirmed' },
  invitee_uuid: String,
  created_at: { type: Date, default: Date.now }
});

export default mongoose.models.Booking || mongoose.model('Booking', BookingSchema);