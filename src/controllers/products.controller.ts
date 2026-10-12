import { Request, Response } from "express";
import products from "../data/products.json" with { type: "json" };

export const getProductsList = (req: Request, res: Response) => {
  const offset = Number(req.query.offset) || 0;
  const limit = Number(req.query.limit) || 10;
  const categoryId = Number(req.query.category);
  const search = req.query.search as string;
  const sort = req.query.sort as string;
  const sortBy = req.query.sortBy as string;

  let filteredProducts = [...products];

  if (!Number.isNaN(categoryId)) {
    filteredProducts = filteredProducts.filter(
      (product) => product.categoryId === categoryId,
    );
  }

  //Search by Band or Name
  if (search) {
    const query = search.toLowerCase();

    filteredProducts = filteredProducts.filter(
      (product) =>
        product.band.toLowerCase().includes(query) ||
        product.name.toLowerCase().includes(query),
    );
  }

  //Sort by Price
  if (sortBy === "price") {
    filteredProducts.sort((a, b) =>
      sort === "desc" ? b.price - a.price : a.price - b.price,
    );
  }

  //Sort by Band
  if (sortBy === "band") {
    filteredProducts.sort((a, b) =>
      sort === "desc"
        ? b.band.localeCompare(a.band)
        : a.band.localeCompare(b.band),
    );
  }

  const data = filteredProducts.slice(offset, offset + limit);
  const count = filteredProducts.length;

  res.status(200).json({
    data,
    offset,
    limit,
    count,
  });
}
  
export const getProductById = (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }
  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({
      error: "Product not found",
    });
  }

  res.json(product);
};
