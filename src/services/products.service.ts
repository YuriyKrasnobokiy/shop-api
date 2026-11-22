import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { CreateProductDto, Product, ProductQueryParams } from "../types/product.js";
import { nanoid } from "nanoid";

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

// Get a single product by ID

export const getOneProductById = async (id: string)=> {

  const products = await getAllProducts();
  const searchingProduct = products.find((p) => p.id === id);

  return searchingProduct;
};

export const createProduct = async (product: CreateProductDto) => {
  const products = await getAllProducts();

  const newProduct: Product = {
    ...product,
    id: nanoid(),
  };

  const newProducts = [...products, newProduct];
  await writeFile(productsPath, JSON.stringify(newProducts, null, 2), 'utf-8');

  return newProduct;
}
