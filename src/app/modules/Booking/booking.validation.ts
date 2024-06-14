import { z } from 'zod';

const createBookingValidationSchema = z.object({
  body: z.object({
    carId: z.string({ required_error: 'Card Id is required!' }),
    date: z.string({ required_error: 'Date is required!' }),
    startTime: z.string({ required_error: 'Start time is required!' }),
  }),
});

export const BookingValidations = {
  createBookingValidationSchema,
};
