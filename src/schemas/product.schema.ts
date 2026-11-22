import { z } from 'zod';

export const baseProductSchema = z.object({
  name: z.string().trim().min(2),
  band: z.string().trim().min(2),
  price: z.number().positive(),
  stock: z.number().int().nonnegative(),
  image: z.string().trim().min(1),
  description: z.string().trim().min(10),
});

export const tShirtSchema = baseProductSchema.extend({
  categoryId: z.literal(0),
  size: z.string().trim().min(1),
});

export const cdSchema = baseProductSchema.extend({
  categoryId: z.literal(1),
});

export const vinylSchema = baseProductSchema.extend({
  categoryId: z.literal(2),
});

export const createProductSchema = z.discriminatedUnion("categoryId", [tShirtSchema, cdSchema, vinylSchema]);