import type { createProductSchema } from '../schemas/product.schema.js';
import type { z } from 'zod';

interface BaseProduct {
  id: string;
  name: string;
  band: string;
  price: number;
  stock: number;
  image: string;
  description: string;
}

export const PRODUCT_CATEGORY_IDS = [0, 1, 2] as const;
export type ProductCategoryId = typeof PRODUCT_CATEGORY_IDS[number];
export interface TShirt extends BaseProduct {
  categoryId: 0;
  size: string;
}

export interface CD extends BaseProduct {
  categoryId: 1;
}

export interface Vinyl extends BaseProduct {
  categoryId: 2;
}

export type Product = TShirt | CD | Vinyl;

export interface ProductQueryParams {
  offset: number;
  limit: number;
  categoryId?: Product['categoryId'];
  search?: string;
  sort?: 'asc' | 'desc';
  sortBy?: "price" | "band";
}

export type CreateProductDto = z.infer<typeof createProductSchema>;