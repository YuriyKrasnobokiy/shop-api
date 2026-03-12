import { Request, Response, Router } from "express";
import products from "../data/products.json" with { type: "json" };
import categories from "../data/categories.json" with { type: "json" };

const router = Router();

/**
 * @swagger
 * /products:
 *   get:
 *     tags:
 *       - Products
 *     summary: Get products list
 *     description: Returns paginated list of products
 *     parameters:
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           example: 0
 *         description: Number of products to skip
 *
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Number of products to return
 *
 *       - in: query
 *         name: category
 *         schema:
 *           type: integer
 *           enum: [0, 1, 2]
 *         description: Filter products by category id
 *
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *           example: metallica
 *         description: Search products by name or band
 *
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [price, band]
 *         description: Field to sort by (price or band)
 *
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Sort direction (asc or desc)
 *
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             example:
 *               data:
 *                 - id: 1
 *                   name: Metallica Logo T-Shirt
 *                   price: 25
 *                   categoryId: 0
 *                   stock: 20
 *               offset: 0
 *               limit: 10
 *               count: 20
 */
router.get("/", (req, res) => {
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
});

/**
 * @swagger
 * /products/categories:
 *   get:
 *     tags:
 *       - Products
 *     summary: Get all products categories
 *     description: List of categories
 *     parameters:
 *      - in: query
 *        name: offset
 *        schema:
 *          type: integer
 *          example: 0
 *        description: Number of categories to skip
 *
 *      - in: query
 *        name: limit
 *        schema:
 *          type: integer
 *          example: 10
 *        description: Number of categories to return
 *     responses:
 *       200:
 *         description: Product found
 *         content:
 *           application/json:
 *                 example:
 *                  data:
 *                    - id: 0
 *                      name: tshirt
 *                      label: T-Shirts
 *                    - id: 1
 *                      name: cd
 *                      label: CD
 *                    - id: 2
 *                      name: vinyl
 *                      label: Vinyl
 *                  offset: 0
 *                  limit: 10
 *                  count: 3
 */
router.get("/categories", (req, res) => {
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
});

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     tags:
 *       - Products
 *     summary: Get product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 3
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product found
 *         content:
 *           application/json:
 *             example:
 *               id: 3
 *               name: Black Sabbath Logo T-Shirt
 *               price: 24
 *               categoryId: 0
 *               stock: 16
 *       404:
 *         description: Product not found
 */
router.get("/:id", (req, res) => {
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
});

export default router;
