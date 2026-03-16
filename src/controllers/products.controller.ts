import { Request, Response } from "express";

import {
  getProducts,
  getProductById,
  getCategories,
} from "../services/products.service.js";

export async function listProducts(req: Request, res: Response) {
  const offset = Number(req.query.offset) || 0;
  const limit = Number(req.query.limit) || 10;
  const categoryId = Number(req.query.category);
  const search = req.query.search as string | undefined;

  const sortParam = req.query.sort;
  const sort =
    sortParam === "asc" || sortParam === "desc" ? sortParam : undefined;

  const sortByParam = req.query.sortBy;
  const sortBy =
    sortByParam === "price" || sortByParam === "band" ? sortByParam : undefined;

  const result = await getProducts({
    offset,
    limit,
    categoryId: Number.isNaN(categoryId) ? undefined : categoryId,
    search,
    sort,
    sortBy,
  });

  res.json(result);
}

export async function productById(req: Request, res: Response) {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }

  const product = await getProductById(id);

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  res.json(product);
}

export async function listCategories(req: Request, res: Response) {
  const offset = Number(req.query.offset) || 0;
  const limit = Number(req.query.limit) || 10;

  const result = await getCategories(offset, limit);

  res.json(result);
}
