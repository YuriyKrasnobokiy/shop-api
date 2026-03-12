import { Router } from "express";
import categories from "../data/categories.json" with { type: "json" };
import products from "../data/products.json" with { type: "json" };
import type { Category } from "../types/category.type.js";
import type { Product } from "../types/product.type.js";
import { listCategories, listProducts, productById } from "../controllers/products.controller.js";

const router = Router();
  const productsData: Product[] = products as Product[];
  const categoriesData: Category[] = categories as Category[];

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
router.get("/", listProducts);

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
 *         description: Categories found
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
router.get("/categories", listCategories);

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
router.get("/:id", productById);

export default router;
