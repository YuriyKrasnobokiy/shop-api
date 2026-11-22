import type { Request, Response } from "express";
import {
  getAllProducts,
  getProductsList as getProductsListService,
  getOneProductById,
  createProduct,
} from "../services/products.service.js";
import type { ProductQueryParams } from "../types/product.js";
import { isProductCategoryId } from "../utils/product-category.js";
import { parseQueryNumber } from "../utils/query-number.js";

export const getProductsList = async (req: Request, res: Response) => {
  const offset = parseQueryNumber(req.query.offset, 0);
  const limit = parseQueryNumber(req.query.limit, 10, 1);
  const rawCategoryId =
    typeof req.query.category === "string" && req.query.category.trim().length
      ? Number(req.query.category)
      : undefined;
  const search =
    typeof req.query.search === "string" && req.query.search.trim().length
      ? req.query.search.trim()
      : undefined;
  const sort =
    typeof req.query.sort === "string" &&
    (req.query.sort === "asc" || req.query.sort === "desc")
      ? req.query.sort
      : undefined;
  const sortBy =
    typeof req.query.sortBy === "string" &&
    (req.query.sortBy === "price" || req.query.sortBy === "band")
      ? req.query.sortBy
      : undefined;

  const params: ProductQueryParams = {
    offset,
    limit,
    search,
    categoryId:
      rawCategoryId !== undefined && isProductCategoryId(rawCategoryId)
        ? rawCategoryId
        : undefined,
    sort,
    sortBy,
  };

  try {
    const result = await getProductsListService(params);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get a single product by ID

export const getProductById = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (typeof id !== "string" || !id.trim()) {
    return res.status(400).json({ error: "Invalid id" });
  }

  try {
    const result = await getOneProductById(id);

    if (!result) {
      return res.status(404).json({
        error: "Product not found",
      });
    }
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createNewProduct = async (req: Request, res: Response) => {
  const productData = req.body;

  try {
    const newProduct = await createProduct(productData);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}