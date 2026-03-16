import type { Product } from "../types/product.type.js";
import { db } from "../db/postgres.js";

type GetProductsParams = {
  offset: number;
  limit: number;
  categoryId?: number;
  search?: string;
  sort?: "asc" | "desc";
  sortBy?: "price" | "band";
};

type ProductRow = {
  id: number;
  name: string;
  band: string;
  category_id: number;
  price: string | number;
  stock: number;
  size: string | null;
  image: string;
  description: string;
};

export async function getProducts(params: GetProductsParams) {
  const { offset, limit, categoryId, search, sort, sortBy } = params;

  let whereClause = `WHERE 1=1`;
  const whereValues: unknown[] = [];
  let paramIndex = 1;

  if (categoryId !== undefined) {
    whereClause += ` AND category_id = $${paramIndex++}`;
    whereValues.push(categoryId);
  }

  if (search) {
    whereClause += ` AND (LOWER(name) LIKE $${paramIndex} OR LOWER(band) LIKE $${paramIndex})`;
    whereValues.push(`%${search.toLowerCase()}%`);
    paramIndex++;
  }

  let orderClause = `ORDER BY id ASC`;

  if (sortBy === "price") {
    orderClause = `ORDER BY price ${sort === "desc" ? "DESC" : "ASC"}`;
  } else if (sortBy === "band") {
    orderClause = `ORDER BY band ${sort === "desc" ? "DESC" : "ASC"}`;
  }

  const dataQuery = `
    SELECT *
    FROM products
    ${whereClause}
    ${orderClause}
    LIMIT $${paramIndex++} OFFSET $${paramIndex}
  `;

  const dataValues = [...whereValues, limit, offset];

  const countQuery = `
    SELECT COUNT(*) AS total
    FROM products
    ${whereClause}
  `;

  const [dataResult, countResult] = await Promise.all([
    db.query<ProductRow>(dataQuery, dataValues),
    db.query<{ total: string }>(countQuery, whereValues),
  ]);

  return {
    data: dataResult.rows.map((row): Product => ({
      id: row.id,
      name: row.name,
      band: row.band,
      categoryId: row.category_id,
      price: Number(row.price),
      stock: row.stock,
      size: row.size ?? undefined,
      image: row.image,
      description: row.description,
    })),
    offset,
    limit,
    count: Number(countResult.rows[0].total),
  };
}

export async function getProductById(id: number): Promise<Product | null> {
  const result = await db.query<ProductRow>(
    `SELECT * FROM products WHERE id = $1`,
    [id]
  );

  if (result.rows.length === 0) {
    return null;
  }

  const row = result.rows[0];

  return {
    id: row.id,
    name: row.name,
    band: row.band,
    categoryId: row.category_id,
    price: Number(row.price),
    stock: row.stock,
    size: row.size ?? undefined,
    image: row.image,
    description: row.description,
  };
}

export async function getCategories(offset: number, limit: number) {
  const result = await db.query(
    `
    SELECT id, name
    FROM categories
    ORDER BY id
    OFFSET $1
    LIMIT $2
    `,
    [offset, limit]
  );

  return result.rows;
}