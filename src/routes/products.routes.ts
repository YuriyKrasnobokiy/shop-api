import { Router } from "express";
import products from "../data/products.json" with { type: "json" };

const router = Router();

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get products list
 *     description: Returns paginated list of products
 *     parameters:
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           example: 0
 *         description: Number of products to skip
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Number of products to return
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

  const data = products.slice(offset, offset + limit);
  const count = products.length;

  res.status(200).json({
    data,
    offset,
    limit,
    count
  });
});

/**
 * @swagger
 * /products/{id}:
 *   get:
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
  const product = products.find(
    (p) => p.id === Number(req.params.id)
  );

  if (!product) {
    return res.status(404).json({
      error: "Product not found"
    });
  }

  res.json(product);
});

export default router;