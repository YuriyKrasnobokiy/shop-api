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
  if (params.categoryId !== undefined){
    filteredProducts = filteredProducts.filter(p=>p.categoryId === params.categoryId);
  }
  return filteredProducts = filteredProducts.slice(params.offset, params.offset + params.limit);
};
