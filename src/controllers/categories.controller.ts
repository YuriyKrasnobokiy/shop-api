import { Request, Response } from "express";
import categories from "../data/categories.json" with { type: "json" };

export const getAllProductCategories = (req: Request, res: Response) => {
  const offset = Number(req.query.offset) || 0;
  const limit = Number(req.query.limit) || 10;
  const data = categories.slice(offset, offset + limit);
  const count = categories.length;

  res.status(200).json({
    data,
    offset,
    limit,
    count,
  });
}