interface BaseProduct {
  id: number;
  name: string;
  band: string;
  price: number;
  stock: number;
  image: string;
  description: string;
}

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