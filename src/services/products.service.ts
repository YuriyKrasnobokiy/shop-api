import { readFile } from "node:fs/promises";
import path from "node:path";
import { Product, ProductQueryParams } from "../types/product.js";

const productsPath = path.resolve('src','data', 'products.json');

export const getAllProducts = async() => {
  const data = await readFile(productsPath, 'utf-8');
  return JSON.parse(data) as Product[];
}

export const getProductsList = async(params: ProductQueryParams) => {
  const products = await getAllProducts();
  let filteredProducts = [...products];

  //Filter by Category
  if (params.categoryId !== undefined){
    filteredProducts = filteredProducts.filter(p=>p.categoryId === params.categoryId);
  }

  //Search by Band or Name
  if (params.search){
    const query = params.search.toLowerCase();

    filteredProducts = filteredProducts.filter(
      (product) =>
        product.band.toLowerCase().includes(query) ||
        product.name.toLowerCase().includes(query),
    );
  }

  //Sort by Price
  if (params.sortBy === "price") {
    filteredProducts.sort((a, b) =>
      params.sort === "desc" ? b.price - a.price : a.price - b.price,
    );
  }

  //Sort by Band
  if (params.sortBy === "band") {
    filteredProducts.sort((a, b) =>
      params.sort === "desc"
        ? b.band.localeCompare(a.band)
        : a.band.localeCompare(b.band),
    );
  }

  const data = filteredProducts.slice(params.offset, params.offset + params.limit);
  const count = filteredProducts.length;

  return {
    data,
    offset: params.offset,
    limit: params.limit,
    count,
  };
};
