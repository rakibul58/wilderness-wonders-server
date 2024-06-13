import { Schema, model } from 'mongoose';
import { BookingModel, IBooking } from './booking.interface';
const bookingSchema = new Schema<IBooking, BookingModel>(
  {
    date: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    car: {
      type: Schema.Types.ObjectId,
      ref: 'Car',
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      default: null,
    },
    totalCost: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

bookingSchema.statics.isBookingExists = async function (
  carId: string,
  date: string,
) {
  return await Booking.findOne({ car: carId, date });
};

export const Booking = model<IBooking, BookingModel>('Booking', bookingSchema);
