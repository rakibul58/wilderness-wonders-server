import { z } from 'zod';

const createCarValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required!' }).trim(),
    description: z
      .string({ required_error: 'Description is required!' })
      .trim(),
    color: z.string({ required_error: 'Color is required!' }).trim(),
    isElectric: z.boolean({ required_error: 'isElectric is required!' }),
    status: z
      .enum(['available', 'unavailable'], {
        invalid_type_error: 'Add a valid status',
      })
      .optional()
      .default('available'),
    features: z.array(z.string(), { required_error: 'features is required!' }),
    pricePerHour: z.number({ required_error: 'pricePerHour is required!' }),
    isDeleted: z.boolean().optional().default(false),
  }),
});

const updateCarValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required!' }).trim().optional(),
    description: z
      .string({ required_error: 'Description is required!' })
      .trim()
      .optional(),
    color: z.string({ required_error: 'Color is required!' }).trim().optional(),
    isElectric: z
      .boolean({ required_error: 'isElectric is required!' })
      .optional(),
    status: z
      .enum(['available', 'unavailable'], {
        invalid_type_error: 'Add a valid status',
      })
      .optional(),
    features: z
      .array(z.string(), { required_error: 'features is required!' })
      .optional(),
    pricePerHour: z
      .number({ required_error: 'pricePerHour is required!' })
      .optional(),
    isDeleted: z.boolean().optional(),
  }),
});

const returnCarBookingValidationSchema = z.object({
  body: z.object({
    bookingId: z.string({ required_error: 'Booking Id is required!' }),
    endTime: z.string({ required_error: 'End time is required!' }),
  }),
});

export const CarValidations = {
  createCarValidationSchema,
  updateCarValidationSchema,
  returnCarBookingValidationSchema,
};
