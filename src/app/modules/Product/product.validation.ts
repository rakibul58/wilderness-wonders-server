import { z } from 'zod';

// create product validation schema
const createProductValidationSchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: 'Name is required!' })
      .trim()
      .min(1, 'Name cannot be empty!'),
    description: z
      .string({ required_error: 'Description is required!' })
      .trim()
      .min(1, 'Description cannot be empty!'),
    price: z
      .number({ required_error: 'Price is required!' })
      .nonnegative('Price cannot be negative!'),
    stock: z
      .number({ required_error: 'Stock is required!' })
      .int('Stock must be an integer!')
      .nonnegative('Stock cannot be negative!'),
    category: z
      .string({ required_error: 'Category is required!' })
      .trim()
      .min(1, 'Category cannot be empty!'),
    rating: z
      .number()
      .min(0, 'Rating cannot be less than 0!')
      .max(5, 'Rating cannot be more than 5!')
      .optional(),
    thumbnail: z
      .string({ required_error: 'Thumbnail URL is required!' })
      .url('Thumbnail must be a valid URL!'),
  }),
});

const updateProductValidationSchema = z.object({
  body: z
    .object({
      name: z.string().trim().min(1, 'Name cannot be empty!').optional(),
      description: z
        .string()
        .trim()
        .min(1, 'Description cannot be empty!')
        .optional(),
      price: z.number().nonnegative('Price cannot be negative!').optional(),
      stock: z
        .number()
        .int('Stock must be an integer!')
        .nonnegative('Stock cannot be negative!')
        .optional(),
      category: z
        .string()
        .trim()
        .min(1, 'Category cannot be empty!')
        .optional(),
      rating: z
        .number()
        .min(0, 'Rating cannot be less than 0!')
        .max(5, 'Rating cannot be more than 5!')
        .optional(),
      thumbnail: z.string().url('Thumbnail must be a valid URL!').optional(),
    })
    .partial(),
});

export const ProductValidations = {
  createProductValidationSchema,
  updateProductValidationSchema,
};
