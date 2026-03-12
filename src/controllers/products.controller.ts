import { Request, Response } from "express";

import {
  getProducts,
  getProductById,
  getCategories
} from "../services/products.service.js";

export function listProducts(req: Request, res: Response) {

  const offset = Number(req.query.offset) || 0;
  const limit = Number(req.query.limit) || 10;
  const categoryId = Number(req.query.category);
  const search = req.query.search as string;
  const sort = req.query.sort as string;
  const sortBy = req.query.sortBy as string;

  const result = getProducts({
    offset,
    limit,
    categoryId: Number.isNaN(categoryId) ? undefined : categoryId,
    search,
    sort,
    sortBy
  });

  res.json(result);
}

export function productById(req: Request, res: Response) {

  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }

  const product = getProductById(id);

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  res.json(product);
}

export function listCategories(req: Request, res: Response) {

  const offset = Number(req.query.offset) || 0;
  const limit = Number(req.query.limit) || 10;

  const result = getCategories(offset, limit);

  res.json(result);
}