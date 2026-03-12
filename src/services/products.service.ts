import products from "../data/products.json" with { type: "json" };
import categories from "../data/categories.json" with { type: "json" };

import type { Product } from "../types/product.type.js";
import type { Category } from "../types/category.type.js";

const productsData: Product[] = products as Product[];
const categoriesData: Category[] = categories as Category[];

export function getProducts(params: {
  offset: number;
  limit: number;
  categoryId?: number;
  search?: string;
  sort?: string;
  sortBy?: string;
}) {

  const { offset, limit, categoryId, search, sort, sortBy } = params;

  let filteredProducts = [...productsData];

  if (categoryId !== undefined) {
    filteredProducts = filteredProducts.filter(
      (p) => p.categoryId === categoryId
    );
  }

  const query = search?.toLowerCase();

  if (query) {
    filteredProducts = filteredProducts.filter(
      (p) =>
        p.band.toLowerCase().includes(query) ||
        p.name.toLowerCase().includes(query)
    );
  }

  if (sortBy === "price") {
    filteredProducts.sort((a, b) =>
      sort === "desc" ? b.price - a.price : a.price - b.price
    );
  }

  if (sortBy === "band") {
    filteredProducts.sort((a, b) =>
      sort === "desc"
        ? b.band.localeCompare(a.band)
        : a.band.localeCompare(b.band)
    );
  }

  const data = filteredProducts.slice(offset, offset + limit);

  return {
    data,
    offset,
    limit,
    count: filteredProducts.length
  };
}

export function getProductById(id: number) {
  return productsData.find((p) => p.id === id);
}

export function getCategories(offset: number, limit: number) {

  const data = categoriesData.slice(offset, offset + limit);

  return {
    data,
    offset,
    limit,
    count: categoriesData.length
  };
}