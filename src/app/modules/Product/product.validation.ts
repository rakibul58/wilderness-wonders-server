import { z } from 'zod';

// create product validation schema
const createProductValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required!' }).trim(),
    description: z
      .string({ required_error: 'Description is required!' })
      .trim(),
  }),
});

export const ProductValidations = {
  createProductValidationSchema,
};
